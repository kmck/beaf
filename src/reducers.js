import {
  RESET_STATE,
  UPDATE_SIZE,
  UPDATE_OPTIONS,
  UPDATE_INPUT,
  UPDATE_OUTPUT,
} from './actionTypes';

const DEFAULT_STATE = {
  input: '',
  output: '',
  options: {},
  size: '50%',
};

export default (state = DEFAULT_STATE, action) => {
  const {
    input,
    output,
    options,
    replace,
  } = action;
  switch (action.type) {
    case RESET_STATE: {
      if (!replace) {
        return { ...state, ...action.state };
      }
      return action.state;
    }

    case UPDATE_SIZE: {
      return { ...state, size: action.size };
    }

    case UPDATE_OPTIONS: {
      if (!replace) {
        const mergedOptions = { ...state.options, ...options };
        return {
          ...state,
          options: mergedOptions,
        };
      }
      return {
        ...state,
        options,
      };
    }

    case UPDATE_INPUT: {
      return {
        ...state,
        input,
      };
    }

    case UPDATE_OUTPUT: {
      return {
        ...state,
        output,
      };
    }

    default: {
      return state;
    }
  }
};
