import 'brace';
import 'brace/theme/textmate';
import 'brace/mode/json';

import { createBeaf } from '../../src/index';

const reactRoot = document.createElement('div');
reactRoot.id = 'root';
document.body.appendChild(reactRoot);

createBeaf({
  localStorageKey: '',
  title: 'Prettify JSON',
  input: '{"foo":"bar","numbers":[1,2,3,4,5]}',
  theme: 'textmate',
  inputMode: 'json',
  outputMode: 'json',
  toolbarOptions: [{
    type: 'number',
    name: 'Indent',
    key: 'indent',
    defaultValue: 2,
  }],
  transform: (input, options) => new Promise((resolve, reject) => {
    try {
      resolve(JSON.stringify(JSON.parse(input), null, parseInt(options.indent, 10)));
    } catch (e) {
      reject(input);
    }
  }),
  backgroundColor: '#f4d960',
  textColor: '#323330',
  fontFamily: 'sans-serif',
  headerBackgroundColor: '#f4d960',
  headerTextColor: '#323330',
  headerFontFamily: 'sans-serif',
  toolbarBackgroundColor: '#323330',
  toolbarTextColor: '#ffffff',
  toolbarFontFamily: 'sans-serif',
  subheaderBackgroundColor: '#f6f6f6',
  subheaderTextColor: '#323330',
  subheaderFontFamily: 'monospace',
  editorFontFamily: 'monospace',
});
