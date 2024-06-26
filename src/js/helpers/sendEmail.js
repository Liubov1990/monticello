import { API_KEY, SERVICE_ID, TEMPLATE_ID } from '../constants/emailJs.js';
import { validInputs, emailJsTemplate } from '../constants/form.js';
import { userName, userEmail, nameMessage, emailMessage } from '../constants/queries.js';
import { clearInputs } from './clearInputs.js';
import { resetButton } from './resetButton.js';

export const sendEmail = async () => {
  try {
    emailJsTemplate.name = userName.value;
    emailJsTemplate.email = userEmail.value;

    emailjs.init(API_KEY);

    await emailjs.send(SERVICE_ID, TEMPLATE_ID, emailJsTemplate);

    clearInputs(userName, nameMessage);
    clearInputs(userEmail, emailMessage);

    resetButton();

    validInputs.name = false;
    validInputs.email = false;

    setTimeout(() => {
      alert('Your personal contacts successfully sent. We will get in touch with you within one working day.');
    }, 1);
  } catch (err) {
    alert('Something went wrong!');
  }
};
