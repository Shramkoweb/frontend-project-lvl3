import onChange from 'on-change';

import {
  removeTrailingSlashes,
  updateValidationState,
} from './utils/utils';
import formRender from './renders/formRender';

export default () => {
  const state = {
    form: {
      process: 'initial',
      url: '',
      isUrlValid: 'empty',
      errors: [],
    },
    feeds: {
      items: [],
    },
    posts: {
      items: [],
    },
    language: 'eng',
  };

  const watchedForm = onChange(state.form, formRender);
  const watchedFeeds = onChange(state.feeds, (...opts) => {
    console.log(opts);
  });

  const input = document.querySelector('.reader-input');
  const form = document.querySelector('.reader-form');

  const handleInputBlur = (evt) => {
    const { value } = evt.target;
    const withoutTralingSlashes = removeTrailingSlashes(value);

    updateValidationState(withoutTralingSlashes, state)
      .then((validUrl) => {
        watchedForm.isUrlValid = 'valid';
        watchedForm.url = validUrl;
      })
      .catch((error) => {
        watchedForm.errors = [...watchedForm.errors, error.message];
        watchedForm.isUrlValid = 'invalid';
      });
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    const { value } = evt.target;

    watchedForm.process = 'adding';
    const currentURL = watchedForm.url;
    watchedFeeds.items = [...watchedFeeds.items, { url: currentURL }];

  };

  input.addEventListener('input', handleInputBlur);
  form.addEventListener('submit', handleFormSubmit);

  // document.querySelector('.reader-add').addEventListener('click', (evt) => {
  //   evt.preventDefault();
  //   watchedState.language = 'ru';
  //   i18next.changeLanguage('eng');
  // });
};
