// tslint:disable-next-line:no-import-side-effect
import '../scss/index.scss';

import cookieNotification from './modules/cookie-notification';
import fadeThrough from './modules/fade-through';
import instagramFeed from './modules/instagram-feed';
import fbqTracking from './modules/tracking-facebook';

import notification from './modules/notification';
import numberInput from './modules/number-input';

import smoothScrolling from './modules/smooth-scrolling';
import stickyNavigation from './modules/sticky-navigation';
import trackingCece from './modules/tracking-project-cece';

fbqTracking();

const init = (): void => {
  stickyNavigation();
  cookieNotification();

  const mainBannerTrigger = document.getElementsByClassName('js_scroll')[0];
  const expander = document.querySelectorAll('.js_expander')[0];
  const expanderTrigger = document.querySelectorAll('.js_expander_lead')[0];
  smoothScrolling(mainBannerTrigger);
  smoothScrolling(expanderTrigger, expander);

  expanderTrigger.addEventListener('click', (e: Event) => {
    e.preventDefault();
    console.log('init its working', e.target);
    console.log('showing the expander', expander);
  });
  fadeThrough();
  instagramFeed();
  trackingCece();
  numberInput();
};

window.addEventListener('load', init);
