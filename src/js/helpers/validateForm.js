import { onlyLettersRegExp, onlyGmailRegExp } from '../constants/regExp.js';
import { removeClass } from '../utils/removeClass.js';
import { addClass } from '../utils/addClass.js';

export const handleForm = () => {
  const form = document.querySelector('.contacts__form');
  const userName = document.querySelector('#name');
  const userEmail = document.querySelector('#email');
  const nameMessage = document.querySelector('.contacts__name-message');
  const emailMessage = document.querySelector('.contacts__email-message');
  const submitBtn = document.querySelector('.contacts__button');

  const validInputs = {
    name: false,
    email: false
  };

  const validateInput = ({ id, value }, pattern, message) => {
    const isPatternValid = pattern.test(value);
    validInputs[id] = isPatternValid && true;

    if (isPatternValid) {
      addClass(message, 'contacts__message--valid');
      removeClass(message, 'contacts__message--invalid');
    } else {
      addClass(message, 'contacts__message--invalid');
      removeClass(message, 'contacts__message--valid');
    }

    if (validInputs.email && validInputs.name) {
      submitBtn.removeAttribute('disabled');
      removeClass(submitBtn, 'button--disabled');
    } else {
      submitBtn.setAttribute('disabled', true);
      addClass(submitBtn, 'button--disabled');
    }
  };

  const resetForm = (inputElem, messageElem) => {
    inputElem.value = '';
    removeClass(messageElem, 'contacts__message--valid');
  };

  const submitForm = event => {
    event.preventDefault();

    validateInput(userName, onlyLettersRegExp, nameMessage);
    validateInput(userEmail, onlyGmailRegExp, emailMessage);

    resetForm(userName, nameMessage);
    resetForm(userEmail, emailMessage);
  };

  userName.addEventListener('input', () => validateInput(userName, onlyLettersRegExp, nameMessage));
  userEmail.addEventListener('input', () => validateInput(userEmail, onlyGmailRegExp, emailMessage));

  form.addEventListener('submit', submitForm);
};
