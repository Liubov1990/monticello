import { heroSliderOptions, newsSliderOptions } from './constants/slider.js';
import { toggleNavigation } from './helpers/toggleNavigation.js';
import { handleForm } from './helpers/handleForm.js';
import { handleGaleryModal } from './helpers/handleGaleryModal.js';

document.addEventListener('DOMContentLoaded', function () {
  new Swiper('.heroSwiperSlider', heroSliderOptions);
  new Swiper('.newsSwiperSlider', newsSliderOptions);

  toggleNavigation();
  handleForm();
  handleGaleryModal();
});
