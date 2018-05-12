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
import trackingCece from './modules/tracking-project-cece';

const init = (): void => {
  stickyNavigation();
  cookieNotification();

  fadeThrough();
  initExpander();
  initSmoothScrolling();
  instagramFeed();
  numberInput();
  trackingCece();
};

window.addEventListener('load', init);
