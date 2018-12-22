import * as Types from '../types';
import * as Utils from '../utils';
import {
  handleEnd,
  handleStart,
  handleMove,
  handleNext,
  handlePrev,
  handleMouseMove,
  handleMouseLeave,
  jumpToSlide
} from './slider';
import { cloneFirstLast, sanatizedNodes } from './utils';

export const initTouch = ({
  trackEl,
  dots,
  slides,
  slider,
  duration,
  onStart,
  onMove,
  onEnd
}: Types.TouchInit): void => {
  if (!trackEl) {
    return;
  }
  const trackWidth = Utils.getElWidth(trackEl);

  if (Array.isArray(slides) && slides.length > 1) {
    slides.forEach((slide: HTMLElement, i: number) => {
      slide.addEventListener('touchstart', onStart(slider), {
        passive: true
      });

      slide.addEventListener(
        'touchmove',
        onMove({
          trackEl,
          dots,
          trackWidth,
          slider,
          duration,
          dotIndex: slider.index,
          itemLength: slides.length
        }),
        { passive: true }
      );

      slide.addEventListener(
        'touchend',
        onEnd({
          trackEl,
          dots,
          trackWidth,
          slider,
          duration,
          dotIndex: slider.index,
          itemLength: slides.length
        }),
        { passive: true }
      );
    });
  }
};

export const initMouse = ({
  trackEl,
  slides,
  slider,
  controls,
  dots,
  duration,
  onMouseMove,
  onMouseLeave,
  onNext,
  onPrev
}: Types.MouseInit): void => {
  if (!trackEl) {
    return;
  }

  const trackWidth = Utils.getElWidth(trackEl);
  const slideWidth = trackWidth / slides.length;

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
            dots,
            trackWidth,
            slider,
            duration,
            dotIndex: slider.index,
            itemLength: slides.length
          })
        );
      }
      if (i === 1) {
        btn.addEventListener(
          'click',
          onNext({
            trackEl,
            dots,
            trackWidth,
            slider,
            duration,
            dotIndex: slider.index,
            itemLength: slides.length
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
  if (Array.isArray(dots) && dots.length > 1) {
    dots.forEach((dot: HTMLElement, index: number): void => {
      dot.addEventListener(
        'click',
        jumpToSlide({
          trackEl,
          slider,
          dots,
          slideWidth,
          dotIndex: index
        })
      );
    });
  }
};

export const init = ({
  trackEl,
  slides,
  controls,
  dots,
  slider,
  duration
}: Types.SliderInit): void => {
  if (!trackEl) {
    return;
  }
  const clonedSlides = sanatizedNodes(cloneFirstLast(slides));
  trackEl.appendChild(clonedSlides[0]);
  trackEl.insertBefore(clonedSlides[1], slides[0]);
  clonedSlides.forEach((slide: Element, i: number) => {
    slides.push(clonedSlides[i]);
  });
  slider.moveX = slider.index * (Utils.getElWidth(trackEl) / slides.length);

  (trackEl as HTMLElement).style.setProperty('--items', `${slides.length}`);
  (trackEl as HTMLElement).style.setProperty('--moveX', `${-slider.moveX}`);
  const mouseConfig: Types.MouseInit = {
    trackEl,
    slides,
    controls,
    dots,
    slider,
    duration,
    jumpToSlide,
    onNext: handleNext,
    onPrev: handlePrev,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave
  };

  const touchConfig: Types.TouchInit = {
    trackEl,
    slides,
    slider,
    dots,
    duration: duration * 2,
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
