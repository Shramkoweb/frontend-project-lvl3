import inputRender from './inputRender';
import i18next from 'i18next';

const formRender = (path, value, prevValue) => {
  switch (path) {
    case 'errors':
      inputRender(value, i18next.t('errorMessages.invalidUrl'));
    case 'isUrlValid':
      inputRender(value, i18next.t('errorMessages.invalidUrl'));
  }
};

export default formRender;
