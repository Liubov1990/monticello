import { toggleClass } from '../utils/toggleClass.js';
import { removeClass } from '../utils/removeClass.js';

export const toggleNavigation = () => {
  const burgerElem = document.querySelector('#burger');
  const navElem = document.querySelector('.header__nav');
  const linkElem = document.querySelectorAll('.header__nav-link');

  const exitNavigation = () => {
    removeClass(burgerElem, 'is-active');
    removeClass(navElem, 'is-open');
  };

  const toggleNav = event => {
    const target = event.currentTarget;

    toggleClass(target, 'is-active');
    toggleClass(navElem, 'is-open');
  };

  const checkActiveClass = () => {
    const display = getComputedStyle(burgerElem).getPropertyValue('display');

    if (display === 'none') {
      exitNavigation();
    }
  };

  linkElem.forEach(link => link.addEventListener('click', exitNavigation));

  burgerElem.addEventListener('click', toggleNav);
  window.addEventListener('resize', checkActiveClass);
};
