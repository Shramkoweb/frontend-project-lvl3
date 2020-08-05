const inputRender = (value, errorMessage) => {
  const input = document.querySelector('.reader-input');
  const button = document.querySelector('.reader-add');
  const feedback = document.querySelector('.invalid-feedback');

  if (value === 'valid') {
    feedback.textContent = '';
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    button.disabled = false;
    return;
  }

  feedback.textContent = errorMessage;
  button.disabled = true;
  input.classList.remove('is-valid');
  input.classList.toggle('is-invalid');
};

export default inputRender;
