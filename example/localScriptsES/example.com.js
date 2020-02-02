export default {
  "https://example.com/": `

    console.re.log("Hello world, I'm at example.com");
    window.ReactNativeWebView.postMessage('Finish loading example.com and post message back to RN');
  `,
}