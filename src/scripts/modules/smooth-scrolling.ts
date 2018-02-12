import logger from './logger';

export default function smoothScrolling(): void {
  interface MathEasing extends Math {
    easeInOutExpo(t: number, b: number, c: number, d: number): number;
  }

  const scrollLayerEl: HTMLElement = document.querySelector(':root');
  const triggerEL: Element = document.getElementsByClassName('js_scroll')[0];
  if (!triggerEL) {
    return;
  }

  const id = triggerEL.getAttribute('href').substr(1) || '';
  const targetEl: HTMLElement = document.getElementById(`${id}`);
  if (!targetEl) {
    return;
  }

  /* Exponential Ease in and out
  /* http://gizma.com/easing/#expo3
  */
  (Math as MathEasing).easeInOutExpo = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) {
      return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    }

    t--;
    return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;
  };

  const scrollTo = (scrollLayer: HTMLElement, el: HTMLElement, duration: number, cb: () => void) => {
      const startPosition = scrollLayer.scrollTop;
      const positionDelta = el.offsetTop - startPosition;
      let startTime = 0;
      cb = cb;

      const animateScroll = (timeStamp: number) => {
        startTime = startTime !== null ? startTime : timeStamp;
        const timeDelta: number = timeStamp - startTime;

        // if (timeDelta >= duration) {
        //   return cb();
        // }

        scrollLayer.scrollTop = (Math as MathEasing).easeInOutExpo(timeDelta, startPosition, positionDelta, duration);
        console.log(scrollLayer.scrollTop, 'working');
        window.requestAnimationFrame(animateScroll);
      };

      // window.requestAnimationFrame(animateScroll);
  };

  const scroll = (e: MouseEvent) => {
      e.preventDefault();

      scrollTo(scrollLayerEl, targetEl, 1618, () => {
          window.location.hash = `#${targetEl.id}`;
      });
  };

  triggerEL.addEventListener('click', scroll, false);
}
