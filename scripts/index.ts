import localLibraries, { remoteLog } from '../local-libraries/main';

export type InjectedScripts = {
  [filter: string]: string;
}

export type GetScriptOptions = {
  localScript?: InjectedScripts;
  remoteUrl?: string;
  remoteHeaders?: HeadersInit;
  useLocal: boolean;
  remoteLogChannel?: string;
}

class ScriptManager {

  remoteLogChannel;

  async getScripts(options : GetScriptOptions) : Promise<InjectedScripts> {
    if (!options) throw new Error('options is undefined');
    try {
      if (!!options.remoteLogChannel) this.remoteLogChannel = options.remoteLogChannel;
      const { localScript, remoteUrl, remoteHeaders, useLocal } = options;
      if (localScript && useLocal) {
        return localScript;
      } else if (remoteUrl) {
        
        const res = await fetch(remoteUrl, {
          method: 'GET',
          headers: remoteHeaders,
        });
        const json = await res.json();
        if (json.success) {
          return json.data;
        }
      }
    } catch(err) {
      throw err;
    }
  }

  combineScripts(scripts : InjectedScripts) {
    let combinedScript = '';
    for (let src in scripts) {
      combinedScript = `
        ${combinedScript}
        if (window.RouteParseRN("${src}", window.location.href)) {
          ${scripts[src]}
        }
      `
    }

    !!this.remoteLogChannel && console.log(`Remote Log: https://console.re/${this.remoteLogChannel}`);

    //@ts-ignore
    return `
    (function(lol){
      ${__DEV__ && !!this.remoteLogChannel ? `
        ${localLibraries}
        ${remoteLog(this.remoteLogChannel)}
        consolere.ready(function() {
          console.re.log('Device connected', window.location.href);
          setTimeout(function() {
            try {
              ${combinedScript}
            } catch(err) {
              alert(err);
            }
          }, 1500);
        });
        
      ` : `
        ${localLibraries}
        setTimeout(function() {
          ${combinedScript}
        }, 500);
      `}
    })()
    `
    
  }
}

export default new ScriptManager();
