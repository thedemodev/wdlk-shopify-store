import '../scss/index.scss';
import stickyNavigation from './modules/sticky-navigation';
import smoothScrolling from './modules/smooth-scrolling';
import cookieNotification from './modules/cookie-notification';
import numberInput from './modules/number-input';
import notification from './modules/notification';
import getInstaFeed from './modules/instagram-feed';
import fbqTracking from './modules/tracking-facebook';
import trackingCece from './modules/tracking-project-cece';
import setTheme from './modules/theme';

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
