// tslint:disable-next-line:no-import-side-effect
import '../scss/index.scss';

import cookieNotification from './modules/cookie-notification';
import getInstaFeed from './modules/instagram-feed';
import fbqTracking from './modules/tracking-facebook';

import notification from './modules/notification';
import numberInput from './modules/number-input';

import smoothScrolling from './modules/smooth-scrolling';
import stickyNavigation from './modules/sticky-navigation';
import setTheme from './modules/theme';
import trackingCece from './modules/tracking-project-cece';

fbqTracking();
notification();

window.addEventListener('load', () => {
  trackingCece();
  getInstaFeed();
  stickyNavigation();
  cookieNotification();
  smoothScrolling();
  numberInput();
  setTheme();
});
