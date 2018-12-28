import * as Types from '../types';
import * as Utils from '../utils';
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
  dotList,
  dotIndex,
  trackEl,
  config,
  slideWidth
}: Types.JumpToSlideInit) => (e: MouseEvent): Types.SliderConfig => {
  if (!trackEl || !dotList || !config) {
    return;
  }
  config.index = dotIndex + 1;
  config.moveX = slideWidth * config.index;

  (trackEl as HTMLElement).style.setProperty('--moveX', `${-config.moveX}`);
  dotList.forEach((dot: HTMLElement) => dot.style.setProperty('--active', '0'));
  (e.currentTarget as HTMLElement).style.setProperty('--active', '1');
  return config;
};
