import * as Slider from '../slider';

const sliderEl = document.querySelector('.js_slider');
const slideEls = [...sliderEl.querySelectorAll('.js_slider-item')];
if (window.matchMedia('(min-width: 769px)').matches) {
  Slider.initDesktop({
    slider: sliderEl,
    slides: slideEls,
    buttons: [...document.querySelectorAll('.js_slider-btn')],
    initConfig: Slider.Config.create(),
    onNext: Slider.handleNext,
    onPrev: Slider.handlePrev,
    onMouseMove: Slider.handleMouseMove,
    onMouseLeave: Slider.handleMouseLeave
  });
} else {
  Slider.initTouch({
    slider: sliderEl,
    slides: slideEls,
    initConfig: Slider.Config.create(),
    onStart: Slider.handleStart,
    onMove: Slider.handleMove,
    onEnd: Slider.handleEnd
  });
}
