import * as Slider from '../slider';

Slider.init({
  slider: document.querySelector('.js_slider'),
  slides: [...document.querySelectorAll('.js_slider-item')],
  initConfig: Slider.Config.create(),
  onStart: Slider.handleStart,
  onMove: Slider.handleMove,
  onEnd: Slider.handleEnd
});
