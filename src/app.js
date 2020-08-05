import axios from 'axios';

import {
  parse,
  removeTrailingSlashes,
  updateValidationState,
} from './utils/utils';
import watchers from './watchers';
import { corsApiUrl } from './constants';

export default () => {
  const state = {
    form: {
      process: 'initial',
      url: '',
      isUrlValid: false,
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

    const currentURL = watchedState.form.url;

    const url = `${corsApiUrl}${currentURL}`;

    axios.get(url)
      .then((response) => {
        state.feeds = [...state.feeds, { url: currentURL }];
        const { feed, posts } = parse(response.data);
        console.log({ feed, posts });
      })
      .catch((err) => {
        throw err;
      });

    console.log(state);
  };

  input.addEventListener('input', handleInputBlur);
  form.addEventListener('submit', handleFormSubmit);

  // document.querySelector('.reader-add').addEventListener('click', (evt) => {
  //   evt.preventDefault();
  //   watchedState.language = 'ru';
  //   i18next.changeLanguage('eng');
  // });
};
