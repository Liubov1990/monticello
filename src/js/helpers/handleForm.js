import { userName, userEmail, nameMessage, emailMessage, submitBtn } from '../constants/queries.js';
import { onlyLettersRegExp, onlyGmailRegExp } from '../constants/regExp.js';
import { validInputs } from '../constants/form.js';
import { sendEmail } from './sendEmail.js';
import { resetButton } from './resetButton.js';
import { removeClass } from '../utils/removeClass.js';
import { addClass } from '../utils/addClass.js';

export const handleForm = () => {
  const form = document.querySelector('.contacts__form');

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
      resetButton();
    }
  };

  const submitForm = event => {
    event.preventDefault();

    validateInput(userName, onlyLettersRegExp, nameMessage);
    validateInput(userEmail, onlyGmailRegExp, emailMessage);

    sendEmail();
  };

  userName.addEventListener('input', () => validateInput(userName, onlyLettersRegExp, nameMessage));
  userEmail.addEventListener('input', () => validateInput(userEmail, onlyGmailRegExp, emailMessage));

  form.addEventListener('submit', submitForm);
};
