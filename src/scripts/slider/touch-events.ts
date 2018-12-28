import * as Types from '../types';
import { handleInfinite } from './slider';

export const handleStart = (slider: Types.SliderConfig) => (
  e: TouchEvent
): Types.SliderConfig => {
  for (const touch of e.touches) {
    slider.startX = touch.clientX;
    return slider;
  }
};

export const handleMove = ({
  trackEl,
  trackWidth,
  itemLength,
  config
}: Types.HandleTouchProps) => (e: TouchEvent): Types.SliderConfig => {
  if (!trackWidth || !itemLength || !config || !trackEl) {
    return;
  }
  const currentPosition = trackWidth / itemLength * config.index;

  for (const touch of e.touches) {
    config.startMoveX = touch.clientX;
    config.moveX = currentPosition + (config.startX - touch.clientX);
    (trackEl as HTMLElement).style.setProperty('--transition', 'none');
    if (config.moveX > 0 && config.moveX < trackWidth / 2) {
      (trackEl as HTMLElement).style.setProperty('--moveX', `${-config.moveX}`);
    }
    return config;
  }
};

export const handleEnd = ({
  trackEl,
  trackWidth,
  itemLength,
  config
}: Types.HandleTouchProps) => (e: TouchEvent): Types.SliderConfig => {
  if (!trackWidth || !itemLength || !config || !trackEl) {
    return;
  }

  const slideWidth = trackWidth / itemLength;
  const absMove = Math.abs(config.index * slideWidth - config.moveX);
  const inifinite = handleInfinite({
    trackEl,
    trackWidth,
    itemLength,
    config
  });

  if (absMove > slideWidth / 3) {
    if (
      config.moveX > config.index * slideWidth &&
      config.index < itemLength - 1
    ) {
      config.index++;
    } else if (config.moveX < config.index * slideWidth && config.index > 0) {
      config.index--;
    }
  }

  (trackEl as HTMLElement).style.setProperty(
    '--transition',
    `transform ${config.transition * 2}ms ease-out`
  );
  (trackEl as HTMLElement).style.setProperty(
    '--moveX',
    `${-config.index * slideWidth}`
  );
  if (config.moveX === 0) {
    inifinite.prev();
  }
  if (config.moveX >= trackWidth - slideWidth) {
    inifinite.next();
  }
  return config;
};
