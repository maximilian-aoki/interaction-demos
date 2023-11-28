// IIFE
const form = (() => {
  // cache DOM
  const allInputs = [...document.querySelectorAll('.input>input')];
  const passwordInput = document.querySelector('#password');
  const passwordCheckInput = document.querySelector('#password-confirm');
  const submitButton = document.querySelector('form>button');
  // const submitMessage = document.querySelector('.submit-message');

  // methods
  let msg;

  function toggleInvalid(input) {
    input.classList.add('invalid');
    input.classList.remove('valid');
    input.classList.remove('info');
  }

  function toggleValid(input) {
    input.classList.add('valid');
    input.classList.remove('invalid');
    input.classList.remove('info');
  }

  function updateError(input, msg) {
    input.nextElementSibling.textContent = msg;
  }

  function validateRequired(input, msg) {
    if (input.value.trim() === '') {
      toggleInvalid(input);
      updateError(input, msg);
      return false;
    }
    toggleValid(input);
    return true;
  }

  function validatePattern(input, msg) {
    const pattern = new RegExp(input.getAttribute('pattern'));
    if (!pattern.test(input.value)) {
      toggleInvalid(input);
      updateError(input, msg);
      return false;
    }
    toggleValid(input);
    return true;
  }

  function validatePassword(input, msg) {
    if (input.value !== passwordInput.value) {
      toggleInvalid(input);
      updateError(input, msg);
      return false;
    }
    toggleValid(input);
    return true;
  }

  function checkValidity(e) {
    const input = e.target ? e.target : e;

    if (input.hasAttribute('required')) {
      msg = 'this input is required';
      if (!validateRequired(input, msg)) {
        return false;
      }
    }

    if (input.hasAttribute('pattern')) {
      if (input.getAttribute('id') === 'email') {
        msg = 'input must be in email form';
      } else if (input.getAttribute('id') === 'zip') {
        msg = 'input must be in CAD zip form';
      } else if (input.getAttribute('id') === 'password') {
        msg = 'must contain at least 3 letters and 3 numbers';
      }
      if (!validatePattern(input, msg)) {
        return false;
      }
    }

    if (input.getAttribute('id') === 'password-confirm') {
      msg = 'must match initial password';
      if (!validatePassword(input, msg)) {
        return false;
      }
    }

    return true;
  }

  function checkPassMatch() {
    checkValidity(passwordCheckInput);
  }

  function addConstantCheck(e) {
    const input = e.target ? e.target : e;

    input.removeEventListener('blur', checkValidity);
    input.removeEventListener('blur', addConstantCheck);
    input.addEventListener('input', checkValidity);

    if (input.getAttribute('id') === 'password') {
      input.addEventListener('input', checkPassMatch);
      passwordCheckInput.addEventListener('input', checkValidity);
    }
  }

  function checkAllElements() {
    let isFormValid = true;
    for (const input of allInputs) {
      if (!checkValidity(input)) {
        isFormValid = false;
      }
      addConstantCheck(input);
    }

    return isFormValid;
  }

  function submitForm(e) {
    if (checkAllElements()) {
      console.log('submitted');
    } else {
      e.preventDefault();
    }
  }

  // event binding
  allInputs.forEach((input) => input.addEventListener('blur', checkValidity));
  allInputs.forEach((input) =>
    input.addEventListener('blur', addConstantCheck),
  );
  submitButton.addEventListener('click', submitForm);
})();

// export
export default form;
