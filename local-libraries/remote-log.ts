export default (channelName) => `

  var consolere = {
    channel:'${channelName}',
    api:'//console.re/connector.js',
    ready: function(c) {var d=document,s=d.createElement('script'),l;s.src=this.api;s.id='consolerescript';s.setAttribute('data-channel', this.channel);s.onreadystatechange=s.onload=function(){if(!l){c();}l=true;};d.getElementsByTagName('head')[0].appendChild(s);}
  };

`;