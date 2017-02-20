import { createBeaf } from '../../src/index';
import './styles.css';

const reactRoot = document.createElement('div');
reactRoot.id = 'root';
document.body.appendChild(reactRoot);

createBeaf({
  localStorageKey: '',
  title: 'Simple transformation',
  input: 'pack my meal to go',
  transform: input => input.split(' ').reverse().join(' '),
});
