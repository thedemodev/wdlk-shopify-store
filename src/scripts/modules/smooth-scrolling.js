// @flow
import logger from './logger';

export default function smoothScrolling () {
    const TRIGGER = document.getElementsByClassName('js_scroll')[0];
    if (!TRIGGER) {
        return;
    }

    const TARGET = document.getElementById(TRIGGER.getAttribute('href').substr(1));
    if (!TARGET) {
        return;
    }

    const SCROLL_LAYER = document.getElementsByClassName('js_scroller')[0];
    if (!SCROLL_LAYER) {
        return;
    }

    //-- Exponential Ease in and out
    //-- http://gizma.com/easing/#expo3
    Math.easeInOutExpo = (t, b, c, d) => {
    	t /= d/2;
    	if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
    	t--;
    	return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
    };


    const SCROLL_TO = (scrollLayer, el, duration, cb = cb || function (){}) => {
        let startPosition = scrollLayer.scrollTop;
        let positionDelta = el.offsetTop - startPosition - 40;
        let startTime = null;


        const ANIMATE_SCROLL = (timeStamp) => {
            startTime = startTime !== null ? startTime : timeStamp;
            let timeDelta = timeStamp - startTime;

            if (timeDelta >= duration) {
              return cb();
            }

            scrollLayer.scrollTop = Math.easeInOutExpo(timeDelta, startPosition, positionDelta, duration);
            window.requestAnimationFrame(ANIMATE_SCROLL);
        }

        window.requestAnimationFrame(ANIMATE_SCROLL);
    }

    const SCROLL = (e) => {
        e.preventDefault();
        SCROLL_TO(SCROLL_LAYER, TARGET, 1618, () => {
            window.location.hash = `#${TARGET.id}`;
        });
    }

    TRIGGER.addEventListener('click', SCROLL, false);
}
