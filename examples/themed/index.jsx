import 'brace';
import 'brace/theme/textmate';
import 'brace/mode/json';

import { createBeaf } from '../../src/index';

createBeaf({
  localStorageKey: '',
  title: 'Prettify JSON',
  input: '{"foo":"bar","numbers":[1,2,3,4,5]}',
  theme: 'textmate',
  inputMode: 'json',
  outputMode: 'json',
  transform: input => new Promise((resolve, reject) => {
    try {
      resolve(JSON.stringify(JSON.parse(input), null, 2));
    } catch (e) {
      reject(input);
    }
  }),
  backgroundColor: '#f4d960',
  textColor: '#323330',
  headerBackgroundColor: '#f4d960',
  headerTextColor: '#323330',
  subheaderBackgroundColor: '#323330',
  subheaderTextColor: '#ffffff',
});
