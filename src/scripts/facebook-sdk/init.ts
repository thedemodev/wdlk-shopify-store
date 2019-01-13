interface Window {
  // tslint:disable-next-line:no-any
  fbAsyncInit: any;
}

export function init(): void {
  window.fbAsyncInit = function(): void {
    FB.init({
      appId: '468166483708548',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v3.2'
    });
  };
  (function(d: Document, s: string, id: string): void {
    let js;
    const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    // tslint:disable-next-line:no-any
    js = d.createElement(s) as any;
    js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
}
