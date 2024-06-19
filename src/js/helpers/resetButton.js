import { submitBtn } from '../constants/queries.js';
import { addClass } from '../utils/addClass.js';

export const resetButton = () => {
  submitBtn.setAttribute('disabled', true);
  addClass(submitBtn, 'button--disabled');
};
