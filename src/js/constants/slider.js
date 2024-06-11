export const heroSliderOptions = {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 7000,
    // waitForTransition: false,
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
};

export const newsSliderOptions = {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  speed: 500,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.arrow--next',
    prevEl: '.arrow--prev'
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    599: {
      slidesPerView: 2,
      spaceBetween: 15
    },
    900: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 30
    }
  }
};
