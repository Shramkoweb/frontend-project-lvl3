import onChange from 'on-change';
import axios from 'axios';

import { validate } from './utils/utils';
import { corsApiUrl } from './constants';

export default () => {
  const state = {
    form: {
      process: 'initial',
      url: '',
      isValid: true,
      errors: [],
    },
    feeds: [],
    posts: [],
    language: 'eng',
  };

  // eslint-disable-next-line no-unused-vars
  const watchedState = onChange(state, (...opts) => {
    console.log(opts);
  });

  const input = document.querySelector('.reader-input');
  const form = document.querySelector('.reader-form');

  const handleInputBlur = (evt) => {
    const { value } = evt.target;
    state.form.process = 'filling';
    state.form.url = value;

    validate(value).then((res) => {
      input.classList.add('is-valid');
      state.form.isValid = true;
    }).catch((error) => {
      input.classList.add('is-invalid');
      state.form.errors = [...state.form.errors, error.message];
      state.form.isValid = false;
    });
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    state.form.process = 'adding';
    const currentURL = state.form.url;
    state.feeds = [...state.feeds, { currentURL }];

    // TODO add API module
    axios.get(`${corsApiUrl}${currentURL}`).then(console.log);
    console.log(state);
  };

  input.addEventListener('blur', handleInputBlur);
  form.addEventListener('submit', handleFormSubmit);

  // document.querySelector('.reader-add').addEventListener('click', (evt) => {
  //   evt.preventDefault();
  //   watchedState.language = 'ru';
  //   i18next.changeLanguage('eng');
  // });
};
