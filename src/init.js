// @ts-check

import Example from './Example';

export default () => {
  const element = document.getElementById('root');
  const obj = new Example(element);
  obj.init();
};
