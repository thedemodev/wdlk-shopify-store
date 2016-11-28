import rAf from './polyfills/rAf';
import stickyNavigation from './modules/sticky-navigation';
import smoothScrolling from './modules/smooth-scrolling';
import cookieNotification from './modules/cookie-notification';
import numberInput from './modules/number-input';
import fbqEvents from './modules/facebook-pixel-events';


rAf();
smoothScrolling();
stickyNavigation();
cookieNotification();
numberInput();
fbqEvents();
