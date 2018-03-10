export interface MathEasingProps extends Math {
  easeInOutExpo(t: number, b: number, c: number, d: number): number;
}

/*
* @param {node list} triggerList -
* node list of elements that trigger the scroll event
* @param {node list} scrollLayers -
* node list of elements that define the scrollable area
*/
export const smoothScrolling = (
  triggerList: NodeListOf<Element>,
  scrollLayers: NodeListOf<Element> = document.querySelectorAll(':root')
) => {
  if (triggerList.length === 0) {
    return;
  }
  /*
  /* Exponential Ease in and out
  /* http://gizma.com/easing/#expo3
  */
  (Math as MathEasingProps).easeInOutExpo = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) {
      return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    }
    t--;
    return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;
  };

  const scrollTo = (
    scrollLayer: Element,
    el: HTMLElement,
    duration: number,
    cb: () => void
  ): void => {
    const startPosition = scrollLayer.scrollTop;
    const positionDelta = el.offsetTop - startPosition;
    let startTime: number | null = null;

    // tslint:disable-next-line
    cb = cb || function() {};

    const animateScroll = (timeStamp: number): void => {
      startTime = startTime !== null ? startTime : timeStamp;
      const timeDelta = timeStamp - startTime;

      if (timeDelta >= duration) {
        // tslint:disable-next-line
        return cb();
      }

      scrollLayer.scrollTop = (Math as MathEasingProps).easeInOutExpo(
        timeDelta,
        startPosition,
        positionDelta,
        duration
      );
      window.requestAnimationFrame(animateScroll);
    };

    window.requestAnimationFrame(animateScroll);
  };

  [...triggerList].filter(el => el.getAttribute('href')).forEach(el => {
    const id = el.getAttribute('href').substr(1) || '';
    const targetEl = document.getElementById(`${id}`);

    const scroll = (e: Event) => {
      e.preventDefault();

      scrollLayers.forEach((layer: Element) => {
        scrollTo(layer, targetEl, 1618, () => {
          window.location.hash = `#${targetEl.id}`;
        });
      });
    };

    el.addEventListener('click', scroll, false);
  });
};

export const initSmoothScrolling = (): void => {
  smoothScrolling(document.querySelectorAll('.js_scroll'));

};
