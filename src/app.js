import axios from 'axios';

import {
  checkForNewPosts,
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
  const dropDown = document.querySelector('.dropdown-menu');

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

  const handleDropdownClick = (evt) => {
    watchedState.language = evt.target.id;
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    const { url } = watchedState.form;
    const urlWithCors = `${corsApiUrl}${url}`;
    watchedState.form.process = 'submitting';

    axios.get(urlWithCors)
      .then((response) => {
        const { feed, posts } = parseRSS(response.data);
        state.feeds = [...state.feeds, { url, ...feed }];
        watchedState.posts = [...state.posts, ...posts];
        watchedState.form.process = 'finished';
        console.log(state);
      })
      .catch((err) => {
        watchedState.form.process = 'finished';
        watchedState.form.errors = ['network'];
        throw err;
      });
  };

  checkForNewPosts(watchedState);
  input.addEventListener('input', handleInputBlur);
  form.addEventListener('submit', handleFormSubmit);
  dropDown.addEventListener('click', handleDropdownClick);
};
