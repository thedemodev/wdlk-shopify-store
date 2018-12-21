import * as Types from '../types';
import * as Utils from '../utils';

export const Config = {
  sliderInit: {
    index: 1,
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

const handleInfinite = ({
  element,
  elementWidth,
  itemLength,
  slider
}: Types.HandleInfiniteProps) => {
  if (!elementWidth || !itemLength || !slider) {
    return;
  }
  const slideWidth = elementWidth / itemLength;

  return {
    prev(): Types.SliderConfig {
      window.setTimeout(() => {
        (element as HTMLElement).style.setProperty('--transition', 'none');
        slider.index = itemLength - 2;
        slider.moveX = slideWidth * slider.index;
        (element as HTMLElement).style.setProperty(
          '--moveX',
          `${-slider.moveX}`
        );
        return slider;
      }, 500);
      return slider;
    },
    next(): Types.SliderConfig {
      window.setTimeout(() => {
        (element as HTMLElement).style.setProperty('--transition', 'none');
        slider.index = 1;
        slider.moveX = slideWidth * slider.index;
        (element as HTMLElement).style.setProperty(
          '--moveX',
          `${-slider.moveX}`
        );
        return slider;
      }, 500);
      return slider;
    }
  };
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
  const inifinite = handleInfinite({
    element,
    elementWidth,
    itemLength,
    slider
  });

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
  if (slider.moveX === 0) {
    inifinite.prev();
  }
  if (slider.moveX >= elementWidth - slideWidth) {
    inifinite.next();
  }
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
  if (slider.moveX >= elementWidth - slideWidth) {
    const inifinite = handleInfinite({
      element,
      elementWidth,
      itemLength,
      slider
    });
    inifinite.next();
  }
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
  if (slider.moveX === 0) {
    const inifinite = handleInfinite({
      element,
      elementWidth,
      itemLength,
      slider
    });
    inifinite.prev();
  }
  return slider;
};

export const handleMouseMove = (init: Types.HandleMouseMoveProps) => (
  e: MouseEvent
): void => {
  const { isNext, sliderEl, slideWidth } = init;
  const { currentTarget, clientX, clientY } = e;
  const btnElWidth = Utils.getElWidth(currentTarget as HTMLElement);
  const btnElHeight = Utils.getElHeight(currentTarget as HTMLElement);

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
