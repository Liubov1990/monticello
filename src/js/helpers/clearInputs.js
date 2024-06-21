import { removeClass } from '../utils/removeClass.js';

export const clearInputs = (inputElem, messageElem) => {
  inputElem.value = '';
  removeClass(messageElem, 'contacts__message--valid');
};
