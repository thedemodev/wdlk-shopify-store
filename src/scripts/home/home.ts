import * as Slider from '../slider';
import * as Types from '../types';

const trackEl = document.querySelector('.js_slider');
const configuration: Types.SliderInit = {
  trackEl,
  slides: [...trackEl.querySelectorAll('.js_slider-item')],
  controls: [...document.querySelectorAll('.js_slider-btn')],
  dots: [...document.querySelectorAll('.js_slider-dot')],
  slider: Slider.Config.create(),
  duration: 300
};

Slider.init(configuration);
