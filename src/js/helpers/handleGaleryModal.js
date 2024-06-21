import { addClass } from '../utils/addClass.js';
import { removeClass } from '../utils/removeClass.js';
import { assignValues } from '../utils/assignValues.js';
import { circleFullscreenImages } from './circleFullscreenImages.js';
import { getItemImg } from './getItemImg.js';
import { items, captionText } from '../constants/queries.js';

export const handleGaleryModal = () => {
  const modal = document.querySelector('#gallery-modal');
  const close = document.querySelector('.gallery__close');
  const imgWrap = document.querySelector('.gallery__modal-image-wrap');

  const modalImg = document.createElement('img');
  modalImg.classList.add('gallery__modal-image');
  modalImg.setAttribute('width', '700');
  modalImg.setAttribute('height', '525');
  imgWrap.insertBefore(modalImg, imgWrap.firstChild);

  items.forEach((item, index) => {
    item.addEventListener('click', () => {
      const image = getItemImg(item);

      addClass(modal, 'is-modal');
      assignValues(modalImg, captionText, image);

      circleFullscreenImages(index, modalImg);
    });
  });

  const closeModal = () => removeClass(modal, 'is-modal');

  const closeModalThroughOverlay = event => {
    const { target } = event;

    if (target === modal) removeClass(modal, 'is-modal');
  };

  close.addEventListener('click', closeModal);
  window.addEventListener('click', closeModalThroughOverlay);
};
