import * as Types from '../types';
import * as Utils from '../utils';
import {
  handleEnd,
  handleStart,
  handleMove,
  handleNext,
  handlePrev,
  handleMouseMove,
  handleMouseLeave
} from './slider';
import { cloneFirstLast, sanatizedNodes } from './utils';

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

export const initDesktop = (sliderInit: Types.SliderDesktopInit): void => {
  if (!sliderInit.slider) {
    return;
  }
  const { slider, slides, controls } = sliderInit;

  const sliderWidth = Utils.getElWidth(slider);
  const slideWidth = sliderWidth / slides.length;

  if (Array.isArray(controls) && controls.length > 1) {
    controls.forEach((btn: HTMLElement, i: number): void => {
      btn.addEventListener(
        'mouseenter',
        sliderInit.onMouseMove({
          isNext: i === 0 ? false : true,
          sliderEl: slider,
          slideWidth
        })
      );
      btn.addEventListener(
        'mousemove',
        sliderInit.onMouseMove({
          isNext: i === 0 ? false : true,
          sliderEl: slider,
          slideWidth
        }),
        {
          passive: true
        }
      );
      btn.addEventListener('mouseleave', sliderInit.onMouseLeave);
      if (i === 0) {
        btn.addEventListener(
          'click',
          sliderInit.onPrev({
            element: slider,
            elementWidth: sliderWidth,
            itemLength: slides.length,
            slider: sliderInit.initConfig
          })
        );
      }
      if (i === 1) {
        btn.addEventListener(
          'click',
          sliderInit.onNext({
            element: slider,
            elementWidth: sliderWidth,
            itemLength: slides.length,
            slider: sliderInit.initConfig
          })
        );
      }
      window.requestAnimationFrame(() =>
        sliderInit.onMouseMove({
          isNext: i === 0 ? false : true,
          sliderEl: slider,
          slideWidth
        })
      );
    });
  }
};

export const init = (sliderInit: Types.SliderInit): void => {
  if (!sliderInit.slider) {
    return;
  }
  const { slider, slides, controls, initConfig } = sliderInit;
  const clonedSlides = sanatizedNodes(cloneFirstLast(slides));
  slider.appendChild(clonedSlides[0]);
  slider.insertBefore(clonedSlides[1], slides[0]);
  clonedSlides.forEach((slide: Element, i: number) => {
    slides.push(clonedSlides[i]);
  });
  initConfig.moveX =
    initConfig.index * (Utils.getElWidth(slider) / slides.length);

  (slider as HTMLElement).style.setProperty('--items', `${slides.length}`);
  (slider as HTMLElement).style.setProperty('--moveX', `${-initConfig.moveX}`);

  if (window.matchMedia('(min-width: 769px)').matches) {
    initDesktop({
      slider,
      slides,
      controls,
      initConfig,
      onNext: handleNext,
      onPrev: handlePrev,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave
    });
  } else {
    initTouch({
      slider,
      slides,
      initConfig,
      onStart: handleStart,
      onMove: handleMove,
      onEnd: handleEnd
    });
  }
};
