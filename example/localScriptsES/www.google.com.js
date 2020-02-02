export default {
  "https://www.google.com/": `

    console.re.log("Hello world, I'm at google.com");
    window.ReactNativeWebView.postMessage('Finish loading google.com and post message back to RN');
  `,
}