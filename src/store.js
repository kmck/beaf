import extend from 'lodash/extend';
import keys from 'lodash/keys';
import pick from 'lodash/pick';

import alt from './alt';
import actions from './actions';

const hasLocalStorage = ('localStorage' in window);

const defaultState = {
    title: 'BEAF',
    titleUrl: '',
    menuItems: [],
    theme: 'github',

    inputTitle: 'Input',
    inputValue: '',
    inputMode: 'text',
    outputTitle: 'Output',
    outputValue: '',
    outputMode: 'text',

    options: {},
    transform: (text) => text,

    pendingTransform: false,
    lastToken: 0,
    token: 0,
};

const stateKeys = keys(defaultState);

class BeafStore {
    constructor() {
        this.bindActions(actions);
        extend(this, defaultState);
        this.hadLocalStorageInput = (hasLocalStorage && localStorage.getItem('BEAF_REPL') !== null);
        if (this.hadLocalStorageInput) {
            this.inputValue = localStorage.getItem('BEAF_REPL');
        }
        setTimeout(() => {
            this.transformInput();
        }, 1);
    }

    /**
     * Transforms the text content and updates the output
     *
     * @return {Promise} Promise that resolves with the output text value
     */
    transformInput() {
        const output = this.transform(this.inputValue, this.options);
        if (output instanceof Promise) {
            const token = ++this.token;
            this.pendingTransform = true;
            return output
                .then((outputValue) => {
                    this.pendingTransform = token !== this.token;

                    // If this is newer than the last thing, update the output.
                    if (token >= this.lastToken) {
                        this.lastToken = token;
                        this.outputValue = outputValue;
                        this.emitChange();
                    }
                });
        }

        this.outputValue = output;
        return new Promise((resolve) => {
            resolve(output);
        });
    }

    /**
     * Sets the initial state
     *
     * @param  {Object} updatedState - full state object
     */
    setInitialState(updatedState) {
        const state = pick(updatedState, stateKeys);
        if (this.hadLocalStorageInput && this.inputValue) {
            delete state.inputValue;
        }
        extend(this, state);
    }

    /**
     * Updates the input text and perform the transformation
     *
     * @param {string} text - new text
     */
    onUpdateInput(input) {
        this.inputValue = input;
        if (hasLocalStorage) {
            localStorage.setItem('BEAF_REPL', input);
        }
        this.transformInput();
    }

    /**
     * Updates any supplied options and performs the transformation
     *
     * @param  {Object} options - updated options
     */
    onUpdateOptions(options) {
        extend(this.options, options);
        this.transformInput();
    }
}

export default alt.createStore(BeafStore, 'BeafStore');
