import React from 'react';
import { render } from 'react-dom';

import 'brace';
import 'brace/mode/json';
import 'brace/theme/monokai';

import BeafLayout from './layout';

import actions from './actions';
import store from './store';

function beaf(container, initialState = {}) {
    /* eslint-disable no-param-reassign */
    if (!(container instanceof window.HTMLElement)) {
        initialState = container;
        container = document.body;
    }
    /* eslint-enable no-param-reassign */
    actions.setInitialState(initialState);
    render(<BeafLayout actions={actions} store={store}/>, container);
}

export default beaf;
