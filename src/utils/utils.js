import * as yup from 'yup';
import uniqueId from 'lodash/uniqueId';

export const renderPositions = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const parse = (xml) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(xml, 'text/xml');
  const id = uniqueId();
  const channel = dom.querySelector('channel');
  const feed = {
    id,
    title: channel.querySelector('title').textContent,
    description: channel.querySelector('description').textContent,
  };
  const items = channel.querySelectorAll('item');
  const posts = [];
  items.forEach((item) => {
    const post = {
      feedID: id,
      title: item.querySelector('title').textContent,
      description: item.querySelector('description').textContent,
      link: item.querySelector('link').textContent,
    };

    posts.push(post);
  });

  return { feed, posts };
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
