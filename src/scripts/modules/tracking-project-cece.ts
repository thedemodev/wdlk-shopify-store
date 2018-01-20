export default function trackingCece () {
  var x = document.referrer; function set_cece_cookie() {
    var expiration = new Date();
    expiration.setTime(expiration.getTime() + (30*24*60*60*1000));
    document.cookie = "refpartner=projce; expires=" + expiration.toUTCString() + "; path=/";
  }

  if (x.indexOf('projectcece.') > -1) {
    set_cece_cookie();
    if (window.sessionStorage){
      sessionStorage.setItem("refpartner", "projce");
    }
  }

  if (window.sessionStorage){
      if (sessionStorage.getItem("refpartner")) {
        if (document.cookie.indexOf('refpartner=projce') < 0) {
          set_cece_cookie();
          }
      }
  }
}

