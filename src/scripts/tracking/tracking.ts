import facebookPixel from './facebook-pixel';
import googleAnalytics from './google-analytics';
export type trackingStatusTypes = 'fbIsNotTracking' | 'gaIsNotTracking';
export type vendorTypes = 'facebook' | 'google';

export default function tracking(): void {
  const fbId = 'js_facebook-pixel';
  const gaId = 'js_ga-tracking';
  const fbOptOutEl = document.querySelector('.js_fb-opt-out');
  const gaOptOutEl = document.querySelector('.ga_fb-opt-out');

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

  if (localStorage.getItem('fbIsNotTracking') === 'true') {
    removeScript(document.querySelectorAll(`.${fbId}`), 'fbIsNotTracking');
  }

  if (localStorage.getItem('fbIsNotTracking') === null) {
    addScript(facebookPixel);
  }

  if (localStorage.getItem('gaIsNotTracking') === 'true') {
    removeScript(document.querySelectorAll(`.${gaId}`), 'gaIsNotTracking');
  }

  if (localStorage.getItem('gaIsNotTracking') === null) {
    addScript(googleAnalytics);
  }

  const handleOptOut = (node: Element, vendor: vendorTypes): void => {
    if (node) {
      switch (vendor) {
        case 'facebook':
          const removeFBTracking = () => {
            setStatus('fbIsNotTracking');
            removeScript(
              document.querySelectorAll(`.${fbId}`),
              'fbIsNotTracking'
            );
          };
          node.addEventListener('click', removeFBTracking);
          break;
        case 'google':
          const removeGATracking = () => {
            setStatus('gaIsNotTracking');
            removeScript(
              document.querySelectorAll(`.${gaId}`),
              'gaIsNotTracking'
            );
          };
          node.addEventListener('click', removeGATracking);
      }
    }
  };

  handleOptOut(fbOptOutEl, 'facebook');
  handleOptOut(gaOptOutEl, 'google');
}

tracking();
