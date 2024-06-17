import { toggleNavigation } from './helpers/toggleNavigation.js';
import { heroSliderOptions, newsSliderOptions } from './constants/slider.js';
import { handleForm } from './helpers/validateForm.js';

document.addEventListener('DOMContentLoaded', function () {
  new Swiper('.heroSwiperSlider', heroSliderOptions);
  new Swiper('.newsSwiperSlider', newsSliderOptions);

  toggleNavigation();
  handleForm();
});
