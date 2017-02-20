import React from 'react';
import {
  connect,
  Provider,
} from 'react-redux';
import {
  bindActionCreators,
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';

import * as actions from './actions';
import beafReducer from './reducers';
import BeafLayout from './BeafLayout';

const mapStateToProps = state => ({
  input: state.input,
  output: state.output,
  options: state.options,
  size: state.size,
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
const BeafApp = connect(mapStateToProps, mapDispatchToProps)(BeafLayout);

export default function Beaf(props) {
  const {
    options: initialOptions,
    input,
    output,
    transform,
    localStorageKey = 'BEAF_REPL',
    doInitialTransform = true,
    ...restProps
  } = props;

  const {
    toolbarOptions = [],
  } = restProps;

  const options = {
    ...toolbarOptions.reduce((defaultToolbarOptions, option) => {
      const {
        key,
        defaultValue,
      } = option;
      if (key && defaultValue != null) {
        Object.assign(defaultToolbarOptions, { [key]: defaultValue });
      }
      return defaultToolbarOptions;
    }, {}),
    ...initialOptions,
  };

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(beafReducer, {
    options,
    input,
    output,
  }, composeEnhancers(applyMiddleware(...[thunk])));

  store.dispatch(actions.loadState(localStorageKey));

  if (doInitialTransform) {
    const state = store.getState();
    store.dispatch(actions.doInputTransformation(
      transform,
      state.input,
      state.options,
      localStorageKey,
    ));
  }

  return (
    <Provider store={store}>
      <BeafApp localStorageKey={localStorageKey} transform={transform} {...restProps} />
    </Provider>
  );
}
