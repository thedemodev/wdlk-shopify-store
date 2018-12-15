import * as Types from '../types';

export const getElWidth = (el: Element): number =>
  el.getBoundingClientRect().width;

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

export const init = (sliderInit: Types.SliderInitProps): void => {
  const { slider, slides, initConfig, onStart, onMove, onEnd } = sliderInit;
  if (!slider) {
    return;
  }
  const sliderWidth = getElWidth(slider);

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

export const initDesktop = (sliderInit: Types.SliderDesktopInit): void => {
  const { slider, slides, buttons, initConfig, onNext, onPrev } = sliderInit;
  if (!slider) {
    return;
  }
  const sliderWidth = getElWidth(slider);
  if (Array.isArray(buttons) && buttons.length > 1) {
    buttons.forEach((btn: HTMLElement, i: number): void => {
      if (i === 0) {
        btn.addEventListener(
          'click',
          onPrev({
            element: slider,
            elementWidth: sliderWidth,
            itemLength: slides.length,
            slider: initConfig
          })
        );
      }
      if (i === 1) {
        btn.addEventListener(
          'click',
          onNext({
            element: slider,
            elementWidth: sliderWidth,
            itemLength: slides.length,
            slider: initConfig
          })
        );
      }
    });
  }
};
