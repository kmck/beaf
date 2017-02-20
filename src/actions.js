import {
  RESET_STATE,
  UPDATE_SIZE,
  UPDATE_OPTIONS,
  UPDATE_INPUT,
  UPDATE_OUTPUT,
} from './actionTypes';

const throttle = (fn, wait) => {
  let waiting = false;
  let called = false;
  return function throttled(...args) {
    if (waiting) {
      called = true;
    } else {
      fn.apply(this, args);
      waiting = setTimeout((e) => {
        if (called) {
          fn.apply(this, args);
          called = false;
        }
        waiting = false;
      });
    }
  };
};

const hasLocalStorage = ('localStorage' in window);

const resetStateAction = (state, replace) => ({
  type: RESET_STATE,
  state,
  replace,
});

const updateSizeAction = size => ({
  type: UPDATE_SIZE,
  size,
});

const updateOptionsAction = (options, replace) => ({
  type: UPDATE_OPTIONS,
  options,
  replace,
});

const updateInputAction = input => ({
  type: UPDATE_INPUT,
  input,
});

const updateOutputAction = output => ({
  type: UPDATE_OUTPUT,
  output,
});

const saveStateToLocalStorage = (state, localStorageKey) => {
  if (hasLocalStorage && localStorageKey) {
    window.localStorage.setItem(localStorageKey, JSON.stringify(state));
  }
};

const saveStateToLocalStorageThrottled = throttle(saveStateToLocalStorage, 500);

export const loadState = localStorageKey => (dispatch, getState) => {
  if (hasLocalStorage && localStorageKey) {
    try {
      const state = JSON.parse(window.localStorage.getItem(localStorageKey));
      if (state) {
        dispatch(resetStateAction(state));
      }
    } catch (e) {
      // Couldn't load state!
    }
  }
};

export const setState = state => (dispatch, getState) => {
  dispatch(resetStateAction(state));
};

export const updateSize = size => (dispatch, getState) => {
  dispatch(updateSizeAction(size));
};

export const updateOptions = (options, replace = false) => (dispatch, getState) => {
  dispatch(updateOptionsAction(options, replace));
};

export const updateInput = (input, localStorageKey) => (dispatch, getState) => {
  dispatch(updateInputAction(input));
};

export const updateOutput = (output, localStorageKey) => (dispatch, getState) => {
  dispatch(updateOutputAction(output));
  saveStateToLocalStorageThrottled(getState(), localStorageKey);
};

export const doInputTransformation = (transform, input, options, localStorageKey) =>
  (dispatch, getState) => {
    const transformedOutput = transform(input, options);
    if (transformedOutput && typeof transformedOutput.then === 'function') {
      transformedOutput
        .then((output) => {
          dispatch(updateOutputAction(output));
          saveStateToLocalStorageThrottled(getState(), localStorageKey);
        })
        .catch((error) => {
          console.error(error);
          saveStateToLocalStorageThrottled(getState(), localStorageKey);
        });
    } else if (transformedOutput != null) {
      dispatch(updateOutputAction(transformedOutput));
      saveStateToLocalStorageThrottled(getState(), localStorageKey);
    }
  };
