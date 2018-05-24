// import facebookPixel from './facebook-pixel';
// import googleAnalytics from './google-analytics';
export type trackingStatusTypes = 'fbIsNotTracking' | 'gaIsNotTracking';
export type vendorTypes = 'facebook' | 'google';

export interface TrackingProps {
  facebook: boolean;
  google: boolean;
  disableTracking(vendor: string): void;
}
export function TrackingManagerFactory(): TrackingProps {
  return {
    facebook: true,
    google: true,
    disableTracking(vendor: string): void {
      const keys = Object.keys(this);

      keys.forEach(key => {
        if (key === vendor) {
          this[vendor] = false;
        }
      });
    }
  };
}

export default function tracking(): void {
  const fbId = 'js_facebook-pixel';
  const gaId = 'js_ga-tracking';
  const fbOptOutEl = document.querySelector('.js_fb-opt-out');
  const gaOptOutEl = document.querySelector('.js_ga-opt-out');

  const addScript = (script: string) => {
    if (typeof script === 'string') {
      document.head.insertAdjacentHTML('beforeend', script);
    }
  };

  const removeScript = (
    node: NodeListOf<Element>,
    status: trackingStatusTypes
  ) => {
    const list = [].slice.call(node);
    list.forEach((element: Element) => {
      if (element) {
        element.parentElement.removeChild(element);
      }
    });
  };

  const setStatus = (status: trackingStatusTypes) => {
    if (localStorage.getItem(status) === 'true') {
      return;
    } else {
      localStorage.setItem(status, 'true');
    }
    console.log('set status to', status);
  };

  // if (localStorage.getItem('fbIsNotTracking') === 'true') {
  //   removeScript(document.querySelectorAll(`.${fbId}`), 'fbIsNotTracking');
  // }

  // if (localStorage.getItem('fbIsNotTracking') === null) {
  //   addScript(facebookPixel);
  // }

  // if (localStorage.getItem('gaIsNotTracking') === 'true') {
  //   removeScript(document.querySelectorAll(`.${gaId}`), 'gaIsNotTracking');
  // }

  // if (localStorage.getItem('gaIsNotTracking') === null) {
  //   addScript(googleAnalytics);
  // }

  // const handleOptOut = (node: Element, vendor: vendorTypes): void => {
  //   if (node) {
  //     switch (vendor) {
  //       case 'facebook':
  //         const removeFBTracking = () => {
  //           setStatus('fbIsNotTracking');
  //           removeScript(
  //             document.querySelectorAll(`.${fbId}`),
  //             'fbIsNotTracking'
  //           );
  //           alert('Facebook tracking has been deactivated');
  //         };
  //         node.addEventListener('click', removeFBTracking);
  //       // break;
  //       // case 'google':
  //       //   const removeGATracking = () => {
  //       //     setStatus('gaIsNotTracking');
  //       //     removeScript(
  //       //       document.querySelectorAll(`.${gaId}`),
  //       //       'gaIsNotTracking'
  //       //     );
  //       //     const gaProperty = 'UA-79543949-2';
  //       //     const disableStr = 'ga-disable-' + gaProperty;

  //       //     document.cookie =
  //       //       disableStr +
  //       //       '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
  //       //     window[disableStr] = true;
  //       //     alert('Google Analytics tracking has been deactivated');
  //       //   };
  //       //   node.addEventListener('click', removeGATracking);
  //     }
  //   }
  // };

  // handleOptOut(fbOptOutEl, 'facebook');
  // handleOptOut(gaOptOutEl, 'google');
}

tracking();
