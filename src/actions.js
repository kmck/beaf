import alt from './alt';

class BeafActions {
    constructor() {
        this.generateActions('setInitialState', 'updateInput', 'updateOptions');
    }
}

export default alt.createActions(BeafActions);
