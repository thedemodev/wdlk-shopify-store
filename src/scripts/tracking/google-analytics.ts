export const googleAnalytics = `
  <script async class="js_ga-tracking">
   var gaProperty = 'UA-79543949-2';
   var disableStr = 'ga-disable-' + gaProperty;
   if (document.cookie.indexOf(disableStr + '=true') > -1) {
       window[disableStr] = true;
   }

   (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
           (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
       m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
   })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

   ga('create', 'UA-79543949-2', 'auto');
   ga('set', 'anonymizeIp', true);
   ga('send', 'pageview');
   </script>
`;

export default googleAnalytics;
