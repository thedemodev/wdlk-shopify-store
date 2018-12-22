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
  trackEl,
  trackWidth,
  itemLength,
  slider
}: Types.HandleInfiniteProps) => {
  if (!trackWidth || !itemLength || !slider) {
    return;
  }
  const slideWidth = trackWidth / itemLength;

  return {
    prev(): Types.SliderConfig {
      window.setTimeout(() => {
        (trackEl as HTMLElement).style.setProperty('--transition', 'none');
        slider.index = itemLength - 2;
        slider.moveX = slideWidth * slider.index;
        (trackEl as HTMLElement).style.setProperty(
          '--moveX',
          `${-slider.moveX}`
        );
        return slider;
      }, 500);
      return slider;
    },
    next(): Types.SliderConfig {
      window.setTimeout(() => {
        (trackEl as HTMLElement).style.setProperty('--transition', 'none');
        slider.index = 1;
        slider.moveX = slideWidth * slider.index;
        (trackEl as HTMLElement).style.setProperty(
          '--moveX',
          `${-slider.moveX}`
        );
        return slider;
      }, 500);
      return slider;
    }
  };
};

const updateDots = ({ dots, dotIndex }: Types.UpdateDotsInit): void => {
  if (!dots) {
    return;
  }
  dots.map((dot: HTMLElement, i: number): void => {
    if (i === dotIndex) {
      dot.style.setProperty('--active', '1');
    } else {
      dot.style.setProperty('--active', '0');
    }
  });
};

export const handleMove = ({
  trackEl,
  trackWidth,
  itemLength,
  slider
}: Types.HandleTouchProps) => (e: TouchEvent): Types.SliderConfig => {
  if (!trackWidth || !itemLength || !slider || !trackEl) {
    return;
  }
  const currentPosition = trackWidth / itemLength * slider.index;

  for (const touch of e.touches) {
    slider.startMoveX = touch.clientX;
    slider.moveX = currentPosition + (slider.startX - touch.clientX);
    (trackEl as HTMLElement).style.setProperty('--transition', 'none');
    if (slider.moveX > 0 && slider.moveX < trackWidth / 2) {
      (trackEl as HTMLElement).style.setProperty('--moveX', `${-slider.moveX}`);
    }
    return slider;
  }
};

export const handleEnd = ({
  trackEl,
  trackWidth,
  itemLength,
  dots,
  slider,
  duration
}: Types.HandleTouchProps) => (e: TouchEvent): Types.SliderConfig => {
  if (!trackWidth || !itemLength || !slider || !trackEl) {
    return;
  }

  const slideWidth = trackWidth / itemLength;
  const absMove = Math.abs(slider.index * slideWidth - slider.moveX);
  const inifinite = handleInfinite({
    trackEl,
    trackWidth,
    itemLength,
    slider
  });

  if (absMove > slideWidth / 3) {
    if (
      slider.moveX > slider.index * slideWidth &&
      slider.index < itemLength - 1
    ) {
      slider.index++;
      updateDots({
        dots,
        dotIndex: slider.index <= dots.length ? slider.index - 1 : 0
      });
    } else if (slider.moveX < slider.index * slideWidth && slider.index > 0) {
      slider.index--;
      updateDots({
        dots,
        dotIndex: slider.index < 1 ? dots.length - 1 : slider.index - 1
      });
    }
  }

  (trackEl as HTMLElement).style.setProperty(
    '--transition',
    `transform ${duration}ms ease-out`
  );
  (trackEl as HTMLElement).style.setProperty(
    '--moveX',
    `${-slider.index * slideWidth}`
  );
  if (slider.moveX === 0) {
    inifinite.prev();
  }
  if (slider.moveX >= trackWidth - slideWidth) {
    inifinite.next();
  }
  return slider;
};

export const handleNext = ({
  trackEl,
  dots,
  trackWidth,
  itemLength,
  slider,
  duration
}: Types.HandleMouseProps) => (e: MouseEvent): Types.SliderConfig => {
  if (!trackWidth || !itemLength || !slider) {
    return;
  }
  const slideWidth = trackWidth / itemLength;
  const inifinite = handleInfinite({
    trackEl,
    trackWidth,
    itemLength,
    slider
  });

  if (slider.moveX >= slideWidth * (itemLength - 1)) {
    return slider;
  }

  slider.index++;
  slider.moveX = slideWidth * slider.index;
  (trackEl as HTMLElement).style.setProperty('--moveX', `${-slider.moveX}`);
  (trackEl as HTMLElement).style.setProperty(
    '--transition',
    `transform ${duration}ms ease-out`
  );
  if (slider.moveX >= trackWidth - slideWidth) {
    inifinite.next();
  }
  updateDots({
    dots,
    dotIndex: slider.index <= dots.length ? slider.index - 1 : 0
  });
  return slider;
};

export const handlePrev = ({
  trackEl,
  trackWidth,
  itemLength,
  dots,
  slider,
  duration
}: Types.HandleMouseProps) => (e: MouseEvent): Types.SliderConfig => {
  if (!trackWidth || !itemLength || !slider) {
    return;
  }
  const slideWidth = trackWidth / itemLength;
  const inifinite = handleInfinite({
    trackEl,
    trackWidth,
    itemLength,
    slider
  });

  if (slider.moveX <= 0) {
    return slider;
  }
  slider.index--;
  slider.moveX = slideWidth * slider.index;
  (trackEl as HTMLElement).style.setProperty('--moveX', `${-slider.moveX}`);
  (trackEl as HTMLElement).style.setProperty(
    '--transition',
    `transform ${duration}ms ease-out`
  );
  if (slider.moveX === 0) {
    inifinite.prev();
  }
  updateDots({
    dots,
    dotIndex: slider.index < 1 ? dots.length - 1 : slider.index - 1
  });
  return slider;
};

export const handleMouseMove = ({
  isNext,
  trackEl,
  slideWidth
}: Types.HandleMouseMoveProps) => (e: MouseEvent): void => {
  const { currentTarget, clientX, clientY } = e;
  const btnElWidth = Utils.getElWidth(currentTarget as HTMLElement);
  const btnElHeight = Utils.getElHeight(currentTarget as HTMLElement);

  const normalizedX = isNext
    ? Utils.normalize(clientX, slideWidth - btnElWidth, slideWidth)
    : Utils.normalize(clientX, 0, btnElWidth);

  const normalizedY = Utils.normalize(
    clientY - Utils.getElTopPosition(trackEl),
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
  window.requestAnimationFrame(() =>
    handleMouseMove({
      isNext,
      trackEl,
      slideWidth
    })
  );
};

export const handleMouseLeave = (e: MouseEvent): void => {
  const { currentTarget } = e;
  const el = currentTarget as HTMLElement;
  el.parentElement.style.setProperty('--x', '0');
  el.parentElement.style.setProperty('--y', '0');
  el.style.setProperty('--active', '0');
};

export const jumpToSlide = ({
  dots,
  dotIndex,
  trackEl,
  slider,
  slideWidth
}: Types.JumpToSlideInit) => (e: MouseEvent): Types.SliderConfig => {
  if (!trackEl || !dots || !slider) {
    return;
  }
  slider.index = dotIndex + 1;
  slider.moveX = slideWidth * slider.index;

  (trackEl as HTMLElement).style.setProperty('--moveX', `${-slider.moveX}`);
  dots.forEach((dot: HTMLElement) => dot.style.setProperty('--active', '0'));
  (e.currentTarget as HTMLElement).style.setProperty('--active', '1');
  return slider;
};
