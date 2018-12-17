import * as Types from '../types';
import * as Utils from '../utils';

export const Config = {
  sliderInit: {
    index: 0,
    moveX: 0,
    startX: 0,
    startMoveX: 0
  },
  create(): Types.SliderConfig {
    return { ...this.sliderInit };
  }
};

export const handleStart = (slider: Types.SliderConfig) => (
  e: TouchEvent
): Types.SliderConfig => {
  for (const touch of e.touches) {
    slider.startX = touch.clientX;
    return slider;
  }
};

export const handleMove = ({
  element,
  elementWidth,
  itemLength,
  slider
}: Types.HandleTouchProps) => (e: TouchEvent): Types.SliderConfig => {
  if (!elementWidth || !itemLength || !slider || !element) {
    return;
  }
  const currentPosition = elementWidth / itemLength * slider.index;

  for (const touch of e.touches) {
    slider.startMoveX = touch.clientX;
    slider.moveX = currentPosition + (slider.startX - touch.clientX);
    (element as HTMLElement).style.setProperty('--transition', 'none');
    if (slider.moveX > 0 && slider.moveX < elementWidth / 2) {
      (element as HTMLElement).style.setProperty('--moveX', `${-slider.moveX}`);
    }
    return slider;
  }
};

export const handleEnd = ({
  element,
  elementWidth,
  itemLength,
  slider
}: Types.HandleTouchProps) => (e: TouchEvent): Types.SliderConfig => {
  if (!elementWidth || !itemLength || !slider || !element) {
    return;
  }

  const slideWidth = elementWidth / itemLength;
  const absMove = Math.abs(slider.index * slideWidth - slider.moveX);

  if (absMove > slideWidth / 3) {
    if (
      slider.moveX > slider.index * slideWidth &&
      slider.index < itemLength - 1
    ) {
      slider.index++;
    } else if (slider.moveX < slider.index * slideWidth && slider.index > 0) {
      slider.index--;
    }
  }

  (element as HTMLElement).style.setProperty(
    '--transition',
    'transform 300ms ease-out'
  );
  (element as HTMLElement).style.setProperty(
    '--moveX',
    `${-slider.index * slideWidth}`
  );
  return slider;
};

export const handleNext = ({
  element,
  elementWidth,
  itemLength,
  slider
}: Types.HandleMouseProps) => (e: MouseEvent): Types.SliderConfig => {
  if (!elementWidth || !itemLength || !slider) {
    return;
  }
  const slideWidth = elementWidth / itemLength;

  if (slider.moveX >= slideWidth * (itemLength - 1)) {
    return slider;
  }
  slider.index++;
  slider.moveX = slideWidth * slider.index;
  (element as HTMLElement).style.setProperty('--moveX', `${-slider.moveX}`);
  (element as HTMLElement).style.setProperty(
    '--transition',
    'transform 300ms ease-out'
  );
  return slider;
};

export const handlePrev = ({
  element,
  elementWidth,
  itemLength,
  slider
}: Types.HandleMouseProps) => (e: MouseEvent): Types.SliderConfig => {
  if (!elementWidth || !itemLength || !slider) {
    return;
  }
  const slideWidth = elementWidth / itemLength;

  if (slider.moveX <= 0) {
    return slider;
  }
  slider.index--;
  slider.moveX = slideWidth * slider.index;
  (element as HTMLElement).style.setProperty('--moveX', `${-slider.moveX}`);
  (element as HTMLElement).style.setProperty(
    '--transition',
    'transform 300ms ease-out'
  );
  return slider;
};

export const handleMouseMove = (init: Types.HandleMouseMoveProps) => (
  e: MouseEvent
): void => {
  const { isNext, sliderEl, slideWidth } = init;
  const { currentTarget, clientX, clientY } = e;
  const btnElWidth = Utils.getElWidth(currentTarget as HTMLElement);
  const btnElHeight = Utils.getElHeight(sliderEl);

  const normalizedX = isNext
    ? Utils.normalize(clientX, slideWidth - btnElWidth, slideWidth)
    : Utils.normalize(clientX, 0, btnElWidth);

  const normalizedY = Utils.normalize(
    clientY - Utils.getElTopPosition(sliderEl),
    0,
    btnElHeight
  );
  const x = normalizedX * btnElWidth;
  const y = normalizedY * btnElHeight;

  (currentTarget as HTMLElement).parentElement.style.setProperty(
    '--x',
    `${Utils.lerp(3e-2, x, normalizedX)}`
  );
  (currentTarget as HTMLElement).parentElement.style.setProperty(
    '--y',
    `${Utils.lerp(2e-2, y, normalizedY)}`
  );
  (currentTarget as HTMLElement).style.setProperty('--active', '1');
  window.requestAnimationFrame(() => handleMouseMove(init));
};

export const handleMouseLeave = (e: MouseEvent): void => {
  const { currentTarget } = e;
  const el = currentTarget as HTMLElement;
  el.parentElement.style.setProperty('--x', '0');
  el.parentElement.style.setProperty('--y', '0');
  el.style.setProperty('--active', '0');
};

export const initTouch = (sliderInit: Types.SliderInitProps): void => {
  const { slider, slides, initConfig, onStart, onMove, onEnd } = sliderInit;
  if (!slider) {
    return;
  }
  const sliderWidth = Utils.getElWidth(slider);

  if (Array.isArray(slides) && slides.length > 1) {
    slides.forEach((slide: HTMLElement) => {
      slide.addEventListener('touchstart', onStart(initConfig), {
        passive: true
      });

      slide.addEventListener(
        'touchmove',
        onMove({
          element: slider,
          elementWidth: sliderWidth,
          itemLength: slides.length,
          slider: initConfig
        }),
        { passive: true }
      );

      slide.addEventListener(
        'touchend',
        onEnd({
          element: slider,
          elementWidth: sliderWidth,
          itemLength: slides.length,
          slider: initConfig
        }),
        { passive: true }
      );
    });
  }
};

export const initDesktop = (init: Types.SliderDesktopInit): void => {
  if (!init.slider) {
    return;
  }
  const sliderWidth = Utils.getElWidth(init.slider);
  const slideWidth = sliderWidth / init.slides.length;
  if (Array.isArray(init.buttons) && init.buttons.length > 1) {
    init.buttons.forEach((btn: HTMLElement, i: number): void => {
      btn.addEventListener(
        'mouseenter',
        init.onMouseMove({
          isNext: i === 0 ? false : true,
          sliderEl: init.slider,
          slideWidth
        })
      );
      btn.addEventListener(
        'mousemove',
        init.onMouseMove({
          isNext: i === 0 ? false : true,
          sliderEl: init.slider,
          slideWidth
        }),
        {
          passive: true
        }
      );
      btn.addEventListener('mouseleave', init.onMouseLeave);
      if (i === 0) {
        btn.addEventListener(
          'click',
          init.onPrev({
            element: init.slider,
            elementWidth: sliderWidth,
            itemLength: init.slides.length,
            slider: init.initConfig
          })
        );
      }
      if (i === 1) {
        btn.addEventListener(
          'click',
          init.onNext({
            element: init.slider,
            elementWidth: sliderWidth,
            itemLength: init.slides.length,
            slider: init.initConfig
          })
        );
      }
      window.requestAnimationFrame(() =>
        init.onMouseMove({
          isNext: i === 0 ? false : true,
          sliderEl: init.slider,
          slideWidth
        })
      );
    });
  }
};
