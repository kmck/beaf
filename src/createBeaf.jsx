import React from 'react';
import { render } from 'react-dom';

import Beaf from './Beaf';

export default function createBeaf(transformOptions = {}) {
  const {
    rootElement = document.getElementById('root') || document.body,
    ...appProps
  } = (typeof transformOptions === 'function' ? { transform: transformOptions } : transformOptions);

  render(
    <Beaf {...appProps} />,
    rootElement
  );
}
