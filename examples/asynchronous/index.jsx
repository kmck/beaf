import debounce from 'lodash/debounce';

import { createBeaf } from '../../src/index';

const debouncedTransform = debounce((resolve, input) => { resolve(input); }, 250);

const reactRoot = document.createElement('div');
reactRoot.id = 'root';
document.body.appendChild(reactRoot);

createBeaf({
  localStorageKey: '',
  title: 'Asynchronous transformation',
  input: 'debounced a quarter second',
  transform: input => new Promise((resolve) => {
    debouncedTransform(resolve, input);
  }),
  backgroundColor: '#ffffff',
  textColor: '#333333',
  headerBackgroundColor: '#fd8382',
  headerTextColor: '#ffffff',
  subheaderBackgroundColor: '#1996fc',
  subheaderTextColor: '#ffffff',
});
