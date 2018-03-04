export interface MathEasingProps extends Math {
  easeInOutExpo(t: number, b: number, c: number, d: number): number;
}

export default function smoothScrolling(
  triggerEl: NodeListOf<Element> | any,
  scrollLayerEl: Element = document.querySelector(':root')
): void {
  if (!triggerEl) {
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

  console.log(triggerEl, '####');
  const nodeList = [...triggerEl]
    .filter(el => el.getAttribute('href'))
    .forEach(el => {
      const id = el.getAttribute('href').substr(1) || '';
      const targetEl = document.getElementById(`${id}`);
      console.log(targetEl, 'sss');
      const scroll = (e: Event) => {
        e.preventDefault();

        scrollTo(scrollLayerEl, targetEl, 1618, () => {
          window.location.hash = `#${targetEl.id}`;
        });
        el.removeEventListener('click', scroll);
      };

      el.addEventListener('click', scroll, false);
    });

  // const id = triggerEl.getAttribute('href').substr(1) || '';
  // const targetEl = document.getElementById(`${id}`);

  // const scroll = (e: Event) => {
  //   e.preventDefault();

  //   scrollTo(scrollLayerEl, targetEl, 1618, () => {
  //     window.location.hash = `#${targetEl.id}`;
  //   });
  //   triggerEl.removeEventListener('click', scroll);
  // };

  // triggerEl.addEventListener('click', scroll, false);
}
