import debounce from 'lodash/debounce';

import { createBeaf } from '../../src/index';
import './styles.css';

const debouncedTransform = debounce((resolve, input) => { resolve(input); }, 250);

const reactRoot = document.createElement('div');
reactRoot.id = 'root';
document.body.appendChild(reactRoot);

createBeaf({
  localStorageKey: '',
  title: 'Transformation with Options',
  input: "I'd like to add you to my professional network on LinkedIn.",
  toolbarOptions: [{
    type: 'checkbox',
    name: 'Debounced',
    key: 'debounced',
    defaultValue: false,
  }, {
    type: 'text',
    name: 'Prefix',
    key: 'prefix',
    defaultValue: 'Subject: ',
  }, {
    type: 'number',
    name: 'Repeat',
    key: 'repeat',
    defaultValue: 1,
  }, {
    type: 'select',
    name: 'Voice',
    key: 'voice',
    options: ['whisper', 'Speak', 'SHOUT'],
    defaultValue: 'Speak',
  }],
  transform: (input, options) => new Promise((resolve, reject) => {
    console.log(input, options);

    let value;
    switch (options.voice) {
      case 'whisper':
        value = input.toLowerCase();
        break;
      case 'SHOUT':
        value = input.toUpperCase();
        break;
      default:
        value = input;
        break;
    }

    if (options.prefix) {
      value = `${options.prefix}${value}`;
    }

    if (options.repeat > 1) {
      value = (new Array(parseInt(options.repeat, 10))).fill(value).join('\n');
    }

    if (options.debounced) {
      debouncedTransform(resolve, value);
    } else {
      resolve(value);
    }
  }),
  editorFontFamily: 'inherit',
});
