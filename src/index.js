// @ts-check
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import init from './init';

const state = {
  form: {
    state: 'initial',
    valid: false,
    errors: [],
  },
  feeds: [],
};

init();
