import * as yup from 'yup';
import axios from 'axios';
import differenceBy from 'lodash/differenceBy';

import {
  corsApiUrl,
  UPDATE_POSTS_TIMEOUT,
} from '../constants';
import parseRSS from '../parser';

export const renderPositions = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const createElement = (template) => {
  if (!template) {
    throw new Error('Unexpected call createElement without template');
  }

  const element = document.createElement('div');
  element.innerHTML = template;

  return element.firstElementChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case renderPositions.AFTERBEGIN:
      container.prepend(element);
      break;
    case renderPositions.BEFOREEND:
      container.append(element);
      break;
    default:
      throw new Error(`Uncorrected render place ${place}`);
  }
};

export const removeTrailingSlashes = (url) => url.replace(/\/+$/, '');

export const validate = (url, addedURLs = []) => yup
  .string()
  .url('invalidUrl')
  .required('emptyString')
  .notOneOf(addedURLs, 'hasUrlYet')
  .validate(url);

export const updateValidationState = (value, state) => {
  const addedURLs = state.feeds.map((feed) => feed.url);

  return validate(value, addedURLs);
};

export const checkForNewPosts = (state) => {
  setTimeout(checkForNewPosts, UPDATE_POSTS_TIMEOUT, state);
  const { feeds } = state;
  const urls = feeds.map((feed) => feed.url);
  urls.forEach((url) => {
    const corsUrl = `${corsApiUrl}${url}`;

    axios.get(corsUrl)
      .then((response) => {
        const { feed, posts } = parseRSS(response.data);
        const { title } = feed;

        const currentFeed = feeds.find((item) => item.title === title);
        const { id } = currentFeed;

        const newPosts = posts.map((post) => ({ ...post, feedID: id }));
        const diffPosts = differenceBy(newPosts, state.posts, 'title');

        if (diffPosts.length !== 0) {
          state.posts = [...diffPosts, ...state.posts];
        }
      })
      .catch((err) => {
        throw err;
      });
  });
};
