import * as Slider from '../slider';

const sliderEl = document.querySelector('.js_slider');

Slider.init({
  slider: sliderEl,
  slides: [...sliderEl.querySelectorAll('.js_slider-item')],
  controls: [...document.querySelectorAll('.js_slider-btn')],
  initConfig: Slider.Config.create()
});
