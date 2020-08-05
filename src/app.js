import {
  removeTrailingSlashes,
  updateValidationState,
} from './utils/utils';
import watchers from './watchers';

export default () => {
  const state = {
    form: {
      process: 'initial',
      url: '',
      isUrlValid: null,
      errors: [],
    },
    feeds: [],
    posts: [],
    language: 'eng',
  };

  const watchedState = watchers(state);

  const input = document.querySelector('.reader-input');
  const form = document.querySelector('.reader-form');

  const handleInputBlur = (evt) => {
    const { value } = evt.target;
    const withoutTralingSlashes = removeTrailingSlashes(value);

    updateValidationState(withoutTralingSlashes, state)
      .then((validUrl) => {
        watchedState.form.isUrlValid = 'valid';
        watchedState.form.url = validUrl;
      })
      .catch((error) => {
        watchedState.form.isUrlValid = 'invalid';
        watchedState.form.errors = error.errors;
      });
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    const { value } = evt.target;

    watchedState.form.process = 'adding';
    const currentURL = watchedState.form.url;
    watchedState.feeds = [...watchedState.feeds, { url: currentURL }];

  };

  input.addEventListener('input', handleInputBlur);
  form.addEventListener('submit', handleFormSubmit);

  // document.querySelector('.reader-add').addEventListener('click', (evt) => {
  //   evt.preventDefault();
  //   watchedState.language = 'ru';
  //   i18next.changeLanguage('eng');
  // });
};
