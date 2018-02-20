// tslint:disable-next-line:no-import-side-effect
import '../scss/index.scss';

import cookieNotification from './modules/cookie-notification';
import fadeThrough from './modules/fade-through';
import fbqTracking from './modules/tracking-facebook';
import instagramFeed from './modules/instagram-feed';

import notification from './modules/notification';
import numberInput from './modules/number-input';

import smoothScrolling from './modules/smooth-scrolling';
import stickyNavigation from './modules/sticky-navigation';
import trackingCece from './modules/tracking-project-cece';

fbqTracking();
notification();

window.addEventListener('load', () => {
  trackingCece();
  fadeThrough();
  instagramFeed();
  stickyNavigation();
  cookieNotification();
  smoothScrolling();
  numberInput();
});
