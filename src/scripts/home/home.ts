import * as Slider from '../slider';

const sliderEl = document.querySelector('.js_slider');
const slideEls = [...sliderEl.querySelectorAll('.js_slider-item')];

Slider.init({
  slider: sliderEl,
  slides: slideEls,
  initConfig: Slider.Config.create(),
  onStart: Slider.handleStart,
  onMove: Slider.handleMove,
  onEnd: Slider.handleEnd
});

Slider.initDesktop({
  slider: sliderEl,
  slides: slideEls,
  buttons: [...document.querySelectorAll('.js_slider-btn')],
  initConfig: Slider.Config.create(),
  onNext: Slider.handleNext,
  onPrev: Slider.handlePrev
});
