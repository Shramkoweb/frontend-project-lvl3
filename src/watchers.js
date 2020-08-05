import onChange from 'on-change';
import i18next from 'i18next';

export default (state) => {
  const form = document.querySelector('form');
  const input = form.querySelector('input');
  const button = form.querySelector('button');
  const errorMessage = document.querySelector('.invalid-feedback');

  const watchedState = onChange(state, (path, value) => {
    if (path === 'form.isUrlValid') {
      if (value === 'valid') {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        button.disabled = false;
      } else {
        errorMessage.textContent = i18next.t('errorMessages.invalidUrl');
        button.disabled = true;
        input.classList.remove('is-valid');
        input.classList.toggle('is-invalid');
      }
    }

    if (path === 'form.errors') {
      const { errors } = state.form;
      if (errors.length === 0) {
        return null;
      }

      console.log(errors);
      const errorMessages = errors
        .map((err) => i18next.t(`errorMessages.${err}`))
        .join('. ');
      errorMessage.textContent = errorMessages;
    }

    return null;
  });

  return watchedState;
};
