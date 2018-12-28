import * as Types from '../types';
import * as Utils from '../utils';
import { handleNext, handlePrev } from './slider';
import { handleMouseMove, handleMouseLeave, jumpToSlide } from './mouse-events';
import { handleEnd, handleStart, handleMove } from './touch-events';
import { cloneFirstLast, sanatizedNodes } from './utils';

export const initTouch = ({
  sliderEl,
  trackEl,
  slideList,
  config,
  onStart,
  onMove,
  onEnd
}: Types.TouchInit): void => {
  if (!trackEl) {
    return;
  }
  const trackWidth = Utils.getElWidth(trackEl);

  if (Array.isArray(slideList) && slideList.length > 1) {
    slideList.forEach((slide: HTMLElement, i: number) => {
      slide.addEventListener('touchstart', onStart(config), {
        passive: true
      });

      slide.addEventListener(
        'touchmove',
        onMove({
          trackEl,
          trackWidth,
          config,
          dotIndex: config.index,
          itemLength: slideList.length
        }),
        { passive: true }
      );

      slide.addEventListener(
        'touchend',
        onEnd({
          trackEl,
          trackWidth,
          config,
          dotIndex: config.index,
          itemLength: slideList.length
        }),
        { passive: true }
      );
    });
  }
};

export const initMouse = ({
  sliderEl,
  trackEl,
  slideList,
  config,
  onMouseMove,
  onMouseLeave,
  onNext,
  onPrev
}: Types.MouseInit): void => {
  if (!trackEl) {
    return;
  }
  const controls = [...sliderEl.querySelectorAll('.js_slider-btn')];
  const dotList = [...sliderEl.querySelectorAll('.js_slider-dot')];
  if (!controls || !dotList) {
    return;
  }
  const trackWidth = Utils.getElWidth(trackEl);
  const slideWidth = trackWidth / slideList.length;

  if (Array.isArray(controls) && controls.length > 1) {
    controls.forEach((btn: HTMLElement, i: number): void => {
      btn.addEventListener(
        'mouseenter',
        onMouseMove({
          isNext: i === 0 ? false : true,
          trackEl,
          slideWidth
        })
      );
      btn.addEventListener(
        'mousemove',
        onMouseMove({
          isNext: i === 0 ? false : true,
          trackEl,
          slideWidth
        }),
        {
          passive: true
        }
      );
      btn.addEventListener('mouseleave', onMouseLeave);
      if (i === 0) {
        btn.addEventListener(
          'click',
          onPrev({
            trackEl,
            dotList,
            trackWidth,
            config,
            dotIndex: config.index,
            itemLength: slideList.length
          })
        );
      }
      if (i === 1) {
        btn.addEventListener(
          'click',
          onNext({
            trackEl,
            dotList,
            trackWidth,
            config,
            dotIndex: config.index,
            itemLength: slideList.length
          })
        );
      }
      window.requestAnimationFrame(() =>
        onMouseMove({
          isNext: i === 0 ? false : true,
          trackEl,
          slideWidth
        })
      );
    });
  }
  if (Array.isArray(dotList) && dotList.length > 1) {
    dotList.forEach((dot: HTMLElement, index: number): void => {
      dot.addEventListener(
        'click',
        jumpToSlide({
          trackEl,
          config,
          dotList,
          slideWidth,
          dotIndex: index
        })
      );
    });
  }
};

export const init = ({ sliderEl, trackEl, config }: Types.SliderInit): void => {
  if (!trackEl) {
    return;
  }
  const slideList = [...trackEl.querySelectorAll('.js_slider-item')];
  const clonedSlides = sanatizedNodes(cloneFirstLast(slideList));
  trackEl.appendChild(clonedSlides[0]);
  trackEl.insertBefore(clonedSlides[1], slideList[0]);
  clonedSlides.forEach((slide: Element, i: number) => {
    slideList.push(clonedSlides[i]);
  });
  config.moveX = config.index * (Utils.getElWidth(trackEl) / slideList.length);

  (trackEl as HTMLElement).style.setProperty('--items', `${slideList.length}`);
  (trackEl as HTMLElement).style.setProperty('--moveX', `${-config.moveX}`);
  const mouseConfig: Types.MouseInit = {
    sliderEl,
    trackEl,
    slideList,
    config,
    jumpToSlide,
    onNext: handleNext,
    onPrev: handlePrev,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave
  };

  const touchConfig: Types.TouchInit = {
    sliderEl,
    trackEl,
    slideList,
    config,
    onStart: handleStart,
    onMove: handleMove,
    onEnd: handleEnd
  };

  if (window.matchMedia('(min-width: 769px)').matches) {
    initMouse(mouseConfig);
  } else {
    initTouch(touchConfig);
  }
};
