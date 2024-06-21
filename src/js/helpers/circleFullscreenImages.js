import { getItemImg } from './getItemImg.js';
import { assignValues } from '../utils/assignValues.js';
import { items, captionText } from '../constants/queries.js';

export const circleFullscreenImages = (index, modalImg) => {
  const prevGalleryImg = document.querySelector('.arrow__gallery-prev');
  const nextGalleryImg = document.querySelector('.arrow__gallery-next');

  let currentIndex = index;

  const getPrevImgIndex = () => (currentIndex === 0 ? items.length - 1 : currentIndex - 1);
  const getNextImgIndex = () => (currentIndex === items.length - 1 ? 0 : currentIndex + 1);

  const setPrevImg = () => {
    const prev = getPrevImgIndex();
    const prevImg = getItemImg(items[prev]);
    assignValues(modalImg, captionText, prevImg);
    currentIndex = prev;
  };

  const setNextImg = () => {
    const next = getNextImgIndex();
    const nextImg = getItemImg(items[next]);
    assignValues(modalImg, captionText, nextImg);
    currentIndex = next;
  };

  prevGalleryImg.addEventListener('click', setPrevImg);
  nextGalleryImg.addEventListener('click', setNextImg);
};
