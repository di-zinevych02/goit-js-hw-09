const feedbackFormEl = document.querySelector('.feedback-form');
let formData = {
  email: '',
  message: '',
};
// Дістали із колекції feedbackFormEl.elements два елементи з іменами email та message.Створили для них окремі змінні email та message. Тобто:email тепер посилається на <input type="email" name="email">. message посилається на <textarea name="message"></textarea>.

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
 // Eлемент, на якому сталася подія
  const formEl = event.target; 
  // Отримуємо значення введеного email
  const inputValue = formEl.value;
  const inputName = formEl.name;
  // Додає або оновлює властивість в об'єкті formData з динамічною назвою властивості, взятою з inputName, і присвоює їй значення inputValue.
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
  // Об'єкт formData, який зберігав значення форми, очищається.
  formData = {};
};
feedbackFormEl.addEventListener('input', funFormInput);
feedbackFormEl.addEventListener('submit', btnFormSubmit);
