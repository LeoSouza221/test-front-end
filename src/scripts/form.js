const form = document.querySelector('#form-validation');
const nameElement = document.querySelector('#name');
const emailElement = document.querySelector('#email');
const messageElement = document.querySelector('#message');

form.addEventListener('submit', function (e) {
  e.preventDefault();
});

const errorMessages = {
  required: "Required field",
  notOnlySpaces: "Not only spaces",
  minLength: (name, value) => `${name} must be at least ${value} characters long`,
  maxLength: (name, value) => `${name} must be less than ${value} characters long`,
  email: "Invalid email"
};

function validateEmail(email) {
  const regex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;

  return regex.test(email)
};

function validateLength(value) {
  return !!value.length;
};

function validateMinLength(min, value) {
  return value >= min;
}

function validateMaxLength(max, value) {
  return value <= max;
}

function validateSpaces(value) {
  return !!value.replace(/\s/g, '').length;
};

function hideError(input) {
  const errorEl = input.parentElement.querySelector('.form-error');
  
  input.classList.remove('input-error');
  errorEl.classList.remove('form-error-visible');
}

function showError(input, message) {
  const errorEl = input.parentElement.querySelector('.form-error');
  const errorMessageEl = input.parentElement.querySelector('.error-message');

  input.classList.add('input-error');
  errorEl.classList.add('form-error-visible');
  errorMessageEl.textContent = message;
};

function checkName() {
  let valid = false
  const name = nameElement.value

  if (!validateLength(name)) {
    showError(nameElement, errorMessages.required);
  } else if (!validateMinLength(3, name.length)) {
    showError(nameElement, errorMessages.minLength('Name', 3));
  } else if (!validateSpaces(name)) {
    showError(nameElement, errorMessages.notOnlySpaces);
  } else {
    hideError(nameElement);
    valid = true
  }

  return valid
}

function checkEmail() {
  let valid = false
  const email = emailElement.value

  if (!validateLength(email)) {
    showError(emailElement, errorMessages.required);
  } else if (!validateEmail(email)) {
    showError(emailElement, errorMessages.email);
  } else {
    hideError(emailElement);
    valid = true;
  }

  return true;
}

function checkMessage() {
  let valid = false
  const message = messageElement.value

  if (!validateLength(message)) {
    showError(messageElement, errorMessages.required)
  } else if (!validateMaxLength(50, message.length)) {
    showError(messageElement, errorMessages.maxLength('Message', 50))
  } else {
    hideError(messageElement);
    valid = true
  }

  return true
}

function validateForm() {
  let formIsValid = false;

  const nameIsValid = checkName();
  const emailIsValid = checkEmail();
  const messageIsValid = checkMessage();

  formIsValid = nameIsValid && emailIsValid && messageIsValid;

  if (formIsValid) {
    window.alert('Success');
  }
};
