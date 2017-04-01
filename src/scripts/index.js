import rAf from './polyfills/rAf';
import stickyNavigation from './modules/sticky-navigation';
import smoothScrolling from './modules/smooth-scrolling';
import cookieNotification from './modules/cookie-notification';
import numberInput from './modules/number-input';
import fbqEvents from './modules/facebook-pixel-events';
import notification from './modules/notification';
import getInstaFeed from './modules/instagram-feed';


window.addEventListener('load', e => {
	rAf();
	getInstaFeed();
	stickyNavigation();
	cookieNotification();
	smoothScrolling();
	numberInput();
});


fbqEvents();
notification();


