export const googleAnalytics = `
  <script async class="js_ga-tracking" src="https://www.googletagmanager.com/gtag/js?id=UA-79543949-2"></script>
  <script async class="js_ga-tracking">
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', ${process.env.GOOGLE_TAG});
  </script>
`;

export default googleAnalytics;
