// tslint:disable-next-line:no-import-side-effect
import '../scss/index.scss';

import cookieNotification from './modules/cookie-notification';
import fadeThrough from './modules/fade-through';
import instagramFeed from './modules/instagram-feed';
import fbqTracking from './modules/tracking-facebook';

import notification from './modules/notification';
import numberInput from './modules/number-input';

import { initSmoothScrolling } from './modules/smooth-scrolling';
import stickyNavigation from './modules/sticky-navigation';
import trackingCece from './modules/tracking-project-cece';

fbqTracking();

const init = (): void => {
  stickyNavigation();
  cookieNotification();

  fadeThrough();
  initSmoothScrolling();
  instagramFeed();
  trackingCece();
  numberInput();
};

window.addEventListener('load', init);
