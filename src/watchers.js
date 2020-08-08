import onChange from 'on-change';
import i18next from 'i18next';

// TODO move to renders folder
// TODO fix semantic HTML
const renderPosts = (posts) => {
  const fragment = document.createDocumentFragment();
  posts.forEach((post) => {
    const { title, link } = post;
    const postElement = document.createElement('div');
    postElement.classList.add('mb-2', 'border-bottom');
    const postTitle = document.createElement('h5');
    postTitle.innerHTML = `<a href="${link}">${title}</a>`;
    postElement.append(postTitle);
    fragment.append(postElement);
  });

  return fragment;
};

const renderFeed = (feed, posts) => {
  const fragment = document.createDocumentFragment();
  const titleElement = document.createElement('h2');
  titleElement.textContent = feed.title;
  const currentFeedPosts = posts.filter((post) => post.feedID === feed.id);
  fragment.append(titleElement, renderPosts(currentFeedPosts));
  return fragment;
};

const renderContent = ({ posts, feeds }) => {
  const feedsContainer = document.querySelector('.feeds');
  feedsContainer.innerHTML = '';

  const feedElements = feeds.map((feed) => renderFeed(feed.feed, posts));
  feedsContainer.append(...feedElements);
};

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

    if (path === 'posts') {
      renderContent(state);
    }

    return null;
  });

  return watchedState;
};
