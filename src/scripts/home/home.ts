import * as IG from '../instagram';
import * as Slider from '../slider';
import * as Types from '../types';

const sliderEl = document.querySelector('.js_slider');

Slider.init({
  sliderEl,
  trackEl: sliderEl.querySelector('.js_track'),
  config: Slider.Config.create({ transitionDuration: 300 })
});

IG.create({
  mountEl: document.querySelector('.js_instagramFeed'),
  postLimit: 24
});
