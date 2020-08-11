import i18next from 'i18next';
import languages from './locales';

export const updateContent = () => {
  const title = document.querySelector('.reader-title');
  const leed = document.querySelector('.reader-leed');
  const addButton = document.querySelector('.reader-add');
  const input = document.querySelector('.reader-input');
  const example = document.querySelector('.reader-example');

  title.textContent = i18next.t('pageTitle');
  leed.textContent = i18next.t('lead');
  addButton.textContent = i18next.t('feedButton');
  input.setAttribute('placeholder', i18next.t('inputPlaceholder'));
  example.textContent = i18next.t('exampleText');
};

const initLocales = () => {
  i18next.init({
    lng: 'ru',
    resources: { ...languages },
  }).then(updateContent);

  i18next.on('languageChanged', updateContent);
};

export default () => {
  initLocales();
};
