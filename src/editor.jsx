import extend from 'lodash/extend';
import pick from 'lodash/pick';
import camelCase from 'lodash/camelCase';

import React, { Component } from 'react';
import AceEditor from 'react-ace';

class BeafEditor extends Component {
    constructor(props) {
        super(props);

        this.actions = props.actions;
        this.store = props.store;

        this.state = this._getStoreState();
        this.__onStoreChange = this._onStoreChange.bind(this);
    }

    componentDidMount() {
        this.store.listen(this.__onStoreChange);
        const editor = this.refs.ace.editor;
        // Autofocus?
        if (this.props.autoFocus) {
            editor.focus();
        }
        // Reset undo manager
        setTimeout(() => {
            editor.getSession().getUndoManager().reset();
        }, 0);
    }

    componentWillUnmount() {
        this.store.unlisten(this.__onStoreChange);
    }

    render() {
        return (
            <div className="editor-container">
                <h3 className="editor-header">{this.state.title}</h3>
                <AceEditor ref="ace" {...this.state}
                    name={this.props.id}
                    readOnly={this.props.readOnly}
                    showPrintMargin={this.props.showPrintMargin}
                    onChange={this.props.onChange}
                    editorProps={{ $blockScrolling: Infinity }}
                    width=""
                    height=""
                />
            </div>
        );
    }

    _getStoreState() {
        const state = this.store.getState();
        const prefix = this.props.prefix || '';
        const prefixed = (key) => state[camelCase(`${prefix} ${key}`)];
        return extend({
            title: prefixed('title'),
            value: prefixed('value'),
            mode: prefixed('mode'),
        }, pick(state, 'theme'));
    }

    _onStoreChange() {
        this.setState(this._getStoreState());
    }

    _onChangeInput(input) {
        this.actions.updateInput(input);
    }
}

BeafEditor.defaultProps = {
    id: '',
    theme: '',
    readOnly: false,
    showPrintMargin: false,
    onChange: () => {},
};


export default BeafEditor;
