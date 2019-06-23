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
  config
}: Types.TouchInit): void => {
  if (!trackEl) {
    return;
  }
  const controls = [...sliderEl.querySelectorAll('.js_slider-btn')];
  if (!controls) {
    return;
  }
  const trackWidth = Utils.getElWidth(trackEl);

  if (Array.isArray(slideList) && slideList.length > 1) {
    slideList.forEach((slide: HTMLElement, i: number) => {
      slide.addEventListener('touchstart', handleStart(config), {
        passive: true
      });

      slide.addEventListener(
        'touchmove',
        handleMove({
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
        handleEnd({
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
  controls.forEach((btn: Element, i: number) => {
    if (i === 0) {
      btn.addEventListener(
        'click',
        handlePrev({
          trackEl,
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
        handleNext({
          trackEl,
          trackWidth,
          config,
          dotIndex: config.index,
          itemLength: slideList.length
        })
      );
    }
  });
};

export const initMouse = ({
  sliderEl,
  trackEl,
  slideList,
  config
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
        handleMouseMove({
          isNext: i === 0 ? false : true,
          trackEl,
          slideWidth
        })
      );
      btn.addEventListener(
        'mousemove',
        handleMouseMove({
          isNext: i === 0 ? false : true,
          trackEl,
          slideWidth
        }),
        {
          passive: true
        }
      );
      btn.addEventListener('mouseleave', handleMouseLeave);
      if (i === 0) {
        btn.addEventListener(
          'click',
          handlePrev({
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
          handleNext({
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
        handleMouseMove({
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
  config.moveX = config.index * Utils.getElWidth(sliderEl);

  (trackEl as HTMLElement).style.setProperty('--items', `${slideList.length}`);
  (trackEl as HTMLElement).style.setProperty('--moveX', `${-config.moveX}`);
  const mouseConfig: Types.MouseInit = {
    sliderEl,
    trackEl,
    slideList,
    config
  };

  const touchConfig: Types.TouchInit = {
    sliderEl,
    trackEl,
    slideList,
    config
  };

  if (window.matchMedia('(min-width: 769px)').matches) {
    initMouse(mouseConfig);
  } else {
    initTouch(touchConfig);
  }
  window.addEventListener('resize', () => {
    config.moveX = config.index * Utils.getElWidth(sliderEl);

    (trackEl as HTMLElement).style.setProperty(
      '--items',
      `${slideList.length}`
    );
    (trackEl as HTMLElement).style.setProperty('--moveX', `${-config.moveX}`);
    if (window.matchMedia('(min-width: 769px)').matches) {
      initMouse(mouseConfig);
    } else {
      initTouch(touchConfig);
    }
  });
};
