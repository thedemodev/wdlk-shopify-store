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
  const fbOptOutList = document.querySelectorAll('.js_fb-opt-out');
  const gaOptOutList = document.querySelectorAll('.js_ga-opt-out');
  const trackingManager = TrackingManagerFactory();

  const handleOptOut = (vendor: vendorTypes): void => {
    const nodeList = document.querySelectorAll(`.js_${vendor}-tracking`);
    const scriptList = [].slice.call(nodeList);
    if (JSON.parse(localStorage.getItem(vendor)) === true) {
      trackingManager.disableTracking(vendor);
      localStorage.setItem(vendor, `${trackingManager[vendor]}`);
      console.log(
        JSON.parse(localStorage.getItem(vendor)) === true,
        'in the the handle opt out'
      );
    }
    scriptList.forEach((script: Element) => {
      if (script) {
        script.parentElement.removeChild(script);
      }
    });
  };

  const setValues = (): void => {
    if (localStorage.getItem('facebook') === null) {
      localStorage.setItem('facebook', `${trackingManager.facebook}`);
    }
    if (JSON.parse(localStorage.getItem('facebook')) === false) {
      handleOptOut('facebook');
    }
    if (localStorage.getItem('google') === null) {
      localStorage.setItem('google', `${trackingManager.google}`);
    }
  };

  setValues();

  [].slice.call(fbOptOutList).forEach((el: Element) => {
    el.addEventListener('click', () => {
      handleOptOut('facebook');
      alert('You deactivated the facebook tracking pixel!');
    });
  });
}

tracking();
