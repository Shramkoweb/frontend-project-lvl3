import axios from 'axios';

import {
  removeTrailingSlashes,
  updateValidationState,
} from './utils/utils';
import watchers from './watchers';
import { corsApiUrl } from './constants';
import parseRSS from './parser';

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
        watchedState.form.errors = [error.errors];
      });
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    const { url } = watchedState.form;
    const urlWithCors = `${corsApiUrl}${url}`;
    watchedState.form.process = 'submitting';

    axios.get(urlWithCors)
      .then((response) => {
        const { feed, posts } = parseRSS(response.data);
        state.feeds = [...state.feeds, { url, feed }];
        watchedState.posts = [...state.posts, ...posts];
        watchedState.form.process = 'finished';
      })
      .catch((err) => {
        watchedState.form.errors = ['network'];
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
