import '../scss/index.scss';
import rAf from './polyfills/rAf';
import stickyNavigation from './modules/sticky-navigation';
import smoothScrolling from './modules/smooth-scrolling';
import cookieNotification from './modules/cookie-notification';
import numberInput from './modules/number-input';
import fbqEvents from './modules/facebook-pixel-events';
import notification from './modules/notification';
import getInstaFeed from './modules/instagram-feed';
import setTheme from './modules/theme';

fbqEvents();
notification();

window.addEventListener('load', () => {
  rAf();
  getInstaFeed();
  stickyNavigation();
  cookieNotification();
  smoothScrolling();
  numberInput();
  setTheme();
});
