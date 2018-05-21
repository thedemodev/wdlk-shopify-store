require('jest-localstorage-mock');
import tracking from './tracking';

describe('tracking', () => {
  const fbId = 'js_facebook-pixel';
  const gaId = 'js_ga-tracking';
  const fbScript = document.createElement('script');
  const gaScript = document.createElement('script');
  fbScript.setAttribute('class', fbId);
  gaScript.setAttribute('class', gaId);

  const handleOptOut = jest.fn().mockImplementation(name => {
    if (localStorage.getItem(name)) {
      return;
    }
    localStorage.setItem(name, 'true');
  });

  test('facebook script initially tracking', () => {
    localStorage.clear();
    expect(localStorage.getItem('fbIsNotTracking')).toBe(null);
    document.head.appendChild(fbScript);
    expect(document.querySelectorAll(`.${fbId}`).length).toBeGreaterThan(0);
    expect(document.querySelectorAll(`.${fbId}`)[0]).toEqual(fbScript);
  });

  test('google analytics script initially tracking', () => {
    localStorage.clear();
    expect(localStorage.getItem('gaIsNotTracking')).toBe(null);
    document.head.appendChild(gaScript);
    expect(document.querySelectorAll(`.${gaId}`).length).toBeGreaterThan(0);
    expect(document.querySelectorAll(`.${gaId}`)[0]).toEqual(gaScript);
  });

  test('facebook tracking has been removed', () => {
    handleOptOut('fbIsNotTracking');
    expect(handleOptOut).toHaveBeenCalledWith('fbIsNotTracking');
    const scripts = [].slice.call(document.querySelectorAll(`.${fbId}`));
    scripts.forEach((element: Element) => {
      element.parentNode.removeChild(element);
      expect(localStorage.getItem('fbIsNotTracking')).toEqual(
        expect.stringMatching('true')
      );
    });
  });

  test('google tracking has been removed', () => {
    handleOptOut('gaIsNotTracking');
    expect(handleOptOut).toHaveBeenCalledWith('gaIsNotTracking');

    const scripts = [].slice.call(document.querySelectorAll(`.${gaId}`));
    scripts.forEach((element: Element) => {
      element.parentNode.removeChild(element);
      expect(localStorage.getItem('gaIsNotTracking')).toEqual(
        expect.stringMatching('true')
      );
    });
  });

  test('facebook tracking persist status', () => {
    expect(localStorage.getItem('fbIsNotTracking')).toEqual(
      expect.stringMatching('true')
    );

    expect(document.getElementById(fbId)).toEqual(null);
  });

  test('google tracking persist status', () => {
    expect(localStorage.getItem('gaIsNotTracking')).toEqual(
      expect.stringMatching('true')
    );

    expect(document.getElementById(gaId)).toEqual(null);
  });
});
