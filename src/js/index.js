import { toggleNavigation } from './helpers/toggleNavigation.js';
import { heroSliderOptions, newsSliderOptions } from './constants/slider.js';

document.addEventListener('DOMContentLoaded', function () {
  const heroSlider = new Swiper('.heroSwiperSlider', heroSliderOptions);
  const newsSlider = new Swiper('.newsSwiperSlider', newsSliderOptions);

  toggleNavigation();
});
