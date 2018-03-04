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

  const mainBannerTrigger = document.querySelectorAll('.js_scroll')[0];
  const expander = document.querySelectorAll('.js_expander')[0];
  const expanderPanes = document.querySelectorAll('.js_expander_lead');
  smoothScrolling(mainBannerTrigger);
  smoothScrolling(expanderPanes, expander);

  fadeThrough();
  instagramFeed();
  trackingCece();
  numberInput();
};

window.addEventListener('load', init);
