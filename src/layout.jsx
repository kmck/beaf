import pick from 'lodash/pick';

import React, { Component } from 'react';

import BeafHeader from './header';
import BeafEditor from './editor';

class BeafLayout extends Component {
    constructor(props) {
        super(props);

        this.actions = props.actions;
        this.store = props.store;

        this.state = this._getStoreState();
        this.__onStoreChange = this._onStoreChange.bind(this);
        this.__onChangeInput = this._onChangeInput.bind(this);
    }

    componentDidMount() {
        this.store.listen(this.__onStoreChange);
    }

    componentWillUnmount() {
        this.store.unlisten(this.__onStoreChange);
    }

    render() {
        return <div className="beaf-layout">
            <BeafHeader {...this.state.header} />
            <main className="beaf-main">
                <BeafEditor {...this.state.editor}
                    id="input"
                    prefix="input"
                    actions={this.actions}
                    store={this.store}
                    onChange={this.__onChangeInput}
                    autoFocus={true}
                />
                <BeafEditor {...this.state.editor}
                    id="output"
                    prefix="output"
                    actions={this.actions}
                    store={this.store}
                    mode={this.state.outputMode}
                    readOnly={true}
                />
            </main>
        </div>;
    }

    _getStoreState() {
        const state = this.store.getState();
        return {
            header: pick(state, 'title', 'titleUrl', 'menuItems'),
            editor: pick(state, 'theme'),
        };
    }

    _onStoreChange() {
        this.setState(this._getStoreState());
    }

    _onChangeInput(input) {
        this.actions.updateInput(input);
    }
}

export default BeafLayout;
