import * as Types from '../types';

export const Config = {
  sliderInit: {
    index: 1,
    moveX: 0,
    startX: 0,
    startMoveX: 0,
    transition: 0
  },
  create({
    transitionDuration
  }: {
    transitionDuration: number;
  }): Types.SliderConfig {
    this.sliderInit.transition = transitionDuration;
    return { ...this.sliderInit };
  }
};

const updateDots = ({ dotList, dotIndex }: Types.UpdateDotsInit): void => {
  if (!dotList) {
    return;
  }
  dotList.map((dot: HTMLElement, i: number): void => {
    if (i === dotIndex) {
      dot.style.setProperty('--active', '1');
    } else {
      dot.style.setProperty('--active', '0');
    }
  });
};

export const handleInfinite = ({
  trackEl,
  trackWidth,
  itemLength,
  config
}: Types.HandleInfiniteProps) => {
  if (!trackWidth || !itemLength || !config) {
    return;
  }
  const slideWidth = trackWidth / itemLength;

  return {
    prev(): Types.SliderConfig {
      window.setTimeout(() => {
        (trackEl as HTMLElement).style.setProperty('--transition', 'none');
        config.index = itemLength - 2;
        config.moveX = slideWidth * config.index;
        (trackEl as HTMLElement).style.setProperty(
          '--moveX',
          `${-config.moveX}`
        );
        return config;
      }, config.transition + 200);
      return config;
    },
    next(): Types.SliderConfig {
      window.setTimeout(() => {
        (trackEl as HTMLElement).style.setProperty('--transition', 'none');
        config.index = 1;
        config.moveX = slideWidth * config.index;
        (trackEl as HTMLElement).style.setProperty(
          '--moveX',
          `${-config.moveX}`
        );
        return config;
      }, config.transition + 200);
      return config;
    }
  };
};

export const handleNext = ({
  trackEl,
  dotList,
  trackWidth,
  itemLength,
  config
}: Types.HandleMouseProps) => (e: MouseEvent): Types.SliderConfig => {
  if (!trackWidth || !itemLength || !config) {
    return;
  }
  const slideWidth = trackWidth / itemLength;
  const inifinite = handleInfinite({
    trackEl,
    trackWidth,
    itemLength,
    config
  });

  if (config.moveX >= slideWidth * (itemLength - 1)) {
    return config;
  }

  config.index++;
  config.moveX = slideWidth * config.index;
  (trackEl as HTMLElement).style.setProperty('--moveX', `${-config.moveX}`);
  (trackEl as HTMLElement).style.setProperty(
    '--transition',
    `transform ${config.transition}ms ease-out`
  );
  if (config.moveX >= trackWidth - slideWidth) {
    inifinite.next();
  }
  if (dotList && dotList.length > 1) {
    updateDots({
      dotList,
      dotIndex: config.index <= dotList.length ? config.index - 1 : 0
    });
  }
  return config;
};

export const handlePrev = ({
  trackEl,
  trackWidth,
  itemLength,
  dotList,
  config
}: Types.HandleMouseProps) => (e: MouseEvent): Types.SliderConfig => {
  if (!trackWidth || !itemLength || !config) {
    return;
  }
  const slideWidth = trackWidth / itemLength;
  const inifinite = handleInfinite({
    trackEl,
    trackWidth,
    itemLength,
    config
  });

  if (config.moveX <= 0) {
    return config;
  }
  config.index--;
  config.moveX = slideWidth * config.index;
  (trackEl as HTMLElement).style.setProperty('--moveX', `${-config.moveX}`);
  (trackEl as HTMLElement).style.setProperty(
    '--transition',
    `transform ${config.transition}ms ease-out`
  );
  if (config.moveX === 0) {
    inifinite.prev();
  }
  if (dotList && dotList.length > 1) {
    updateDots({
      dotList,
      dotIndex: config.index < 1 ? dotList.length - 1 : config.index - 1
    });
  }
  return config;
};
