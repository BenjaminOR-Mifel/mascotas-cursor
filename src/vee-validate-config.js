/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */

/* Config file for VeeValidate */
/* Import and extend the rules you need to use. */
/* DOCUMENTATION: https://logaretm.github.io/vee-validate/guide/basics.html */
import {
  extend,
  localize,
  setInteractionMode,
} from "vee-validate";
import {
  required,
  email,
  numeric,
  min_value,
  max_value,
  max,
} from 'vee-validate/dist/rules';

import es from '@modyo-connect/mifel-mx-widgets-commons/src/vee-validate/translations/es.json';
import en from '@modyo-connect/mifel-mx-widgets-commons/src/vee-validate/translations/en.json';
import mifelMode from '@modyo-connect/mifel-mx-widgets-commons/src/vee-validate/mifel-mode.js';
import esLocales from './locales/es.json';
import enLocales from './locales/en.json';

localize({
  es: {
    messages: {
      ...es.messages,
      ...esLocales.validations
    }
  },
  en: {
    messages: {
      ...en.messages,
      ...enLocales.validations
    }
  },
});

setInteractionMode("mifel", mifelMode);

extend('email', email);
extend('numeric', numeric);
extend('min_value', min_value);

extend('required', required);
extend('max', {
  ...max,
  validate(value, { length }) {
    return value.length <= length;
  },
  params: ['length']
});
extend('max_transfer_amount', {
  ...max_value,
  validate(value, { max }) {
    const amount = value.replace(',', '');
    return amount <= max;
  },
  params: ['max']
});
extend('max_balance', {
  ...max_value,
  validate(value, { max }) {
    const amount = value.replace(',', '');
    return amount <= max;
  },
  params: ['max']
});
