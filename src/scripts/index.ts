// tslint:disable-next-line:no-import-side-effect
import '../scss/index.scss';

import cookieNotification from './modules/cookie-notification';
import fadeThrough from './modules/fade-through';
import instagramFeed from './modules/instagram-feed';

import notification from './modules/notification';
import numberInput from './modules/number-input';

import { initExpander } from './modules/expander';
import { initSmoothScrolling } from './modules/smooth-scrolling';
import stickyNavigation from './modules/sticky-navigation';
import trackingCece from './tracking/tracking-project-cece';
import fbqTracking from './tracking/tracking-facebook';

const init = (): void => {
  stickyNavigation();
  cookieNotification();
  notification();
  fadeThrough();
  initExpander();
  initSmoothScrolling();
  instagramFeed();
  numberInput();
  trackingCece();
  fbqTracking();
};

window.addEventListener('load', init);
