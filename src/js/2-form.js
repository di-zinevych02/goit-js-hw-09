const feedbackFormEl = document.querySelector('.feedback-form');
let formData = {
  email: '',
  message: '',
};
const { email, message } = feedbackFormEl.elements;

const funFormData = () => {
  try {
    const formDataLS = JSON.parse(localStorage.getItem('feedback-form-state'));
    if (formDataLS === null) {
      return;
    }
    formData = formDataLS;
    console.log(formData);
    for (const key in formDataLS) {
      feedbackFormEl.elements[key].value = formDataLS[key];
    }
  } catch (err) {
    console.log(err);
  }
};
funFormData();
const funFormInput = event => {
  const formEl = event.target;
  const inputValue = formEl.value;
  const inputName = formEl.name;
  formData[inputName] = inputValue;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};
const btnFormSubmit = event => {
  // Використовуємо event.preventDefault(), щоб запобігти перезавантаженню сторінки під час відправки форми.
  event.preventDefault();

  //const formEl = event.currentTarget;
  const { currentTarget: formEl } = event;
  console.log({ email: email.value, message: message.value });
  if (email.value === '' || message.value === '') {
    return alert('Fill please all fields');
  }

  formEl.reset();
  localStorage.removeItem('feedback-form-state');
  formData = {};
};
feedbackFormEl.addEventListener('input', funFormInput);
feedbackFormEl.addEventListener('submit', btnFormSubmit);
