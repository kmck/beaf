import { createBeaf } from '../../src/index';
import './styles.css';

createBeaf({
  localStorageKey: '',
  title: 'Simple transformation',
  input: 'pack my meal to go',
  transform: input => input.split(' ').reverse().join(' '),
});
