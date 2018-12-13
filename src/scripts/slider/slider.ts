export interface SliderConfig {
  index: number;
  startX: number;
  startMoveX: number;
  moveX: number;
}
interface HandleSliderProps {
  element: Element;
  elementWidth: number;
  itemLength: number;
  slider: SliderConfig;
}

interface SliderInitProps {
  slider: Element;
  slides: Element[];
  initConfig: SliderConfig;
  onStart(slider: SliderConfig): (e: TouchEvent) => SliderConfig;
  onMove(onMoveInit: HandleSliderProps): (e: TouchEvent) => SliderConfig;
  onEnd(onEndInit: HandleSliderProps): (e: TouchEvent) => SliderConfig;
}
export const getElWidth = (el: Element): number =>
  el.getBoundingClientRect().width;
export const Config = {
  sliderInit: {
    index: 0,
    moveX: 0,
    startX: 0,
    startMoveX: 0
  },
  create(): SliderConfig {
    return { ...this.sliderInit };
  }
};

export const handleStart = (slider: SliderConfig) => (
  e: TouchEvent
): SliderConfig => {
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
}: HandleSliderProps) => (e: TouchEvent): SliderConfig => {
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
}: HandleSliderProps) => (e: TouchEvent) => {
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

export const init = (sliderInit: SliderInitProps): void => {
  const { slider, slides, initConfig, onStart, onMove, onEnd } = sliderInit;
  const sliderWidth = getElWidth(slider);

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
};
