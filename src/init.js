import i18next from 'i18next';
import locales from './locales';
import { languages } from './constants';

export const dropButtonInit = () => {
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const menu = document.querySelector('.dropdown-menu');
  dropdownToggle.textContent = languages.eng;

  const languageKeys = Object.keys(languages);
  languageKeys.forEach((lang) => {
    const dropdownItem = document.createElement('a');
    dropdownItem.classList.add('dropdown-item');
    dropdownItem.id = lang;
    dropdownItem.setAttribute('href', '#');
    dropdownItem.textContent = languages[lang];
    menu.append(dropdownItem);
  });
};

export const updateContent = () => {
  const title = document.querySelector('.reader-title');
  const leed = document.querySelector('.reader-leed');
  const addButton = document.querySelector('.reader-add');
  const input = document.querySelector('.reader-input');
  const example = document.querySelector('.reader-example');
  const copyright = document.querySelector('.copyright');

  title.textContent = i18next.t('pageTitle');
  leed.textContent = i18next.t('lead');
  addButton.textContent = i18next.t('feedButton');
  input.setAttribute('placeholder', i18next.t('inputPlaceholder'));
  example.textContent = i18next.t('exampleText');
  copyright.textContent = i18next.t('copyright');
};

const initLocales = () => {
  i18next.init({
    lng: 'eng',
    resources: { ...locales },
  }).then(updateContent);

  i18next.on('languageChanged', updateContent);
};

export default () => {
  initLocales();
  dropButtonInit();
};
