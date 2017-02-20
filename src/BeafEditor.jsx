import React, { Component, PropTypes } from 'react';
import AceEditor from 'react-ace';

import 'brace/theme/github';

export default class BeafEditor extends Component {
  static defaultProps = {
    value: '',
    autoFocus: false,
    resetUndo: true,
    readOnly: false,
    theme: 'github',
    mode: 'text',
    aceStyle: { position: 'absolute' },
    aceProps: {
      width: '',
      height: '',
      showPrintMargin: false,
      wrapEnabled: true,
      editorProps: { $blockScrolling: Infinity },
    },
  };

  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    autoFocus: PropTypes.bool,
    readOnly: PropTypes.bool,
    resetUndo: PropTypes.bool,
    theme: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    aceStyle: PropTypes.object,
    aceProps: PropTypes.object,
    aceOptions: PropTypes.object,
  };

  componentDidMount() {
    const { ace = {} } = this.refs;
    const {
      autoFocus,
      aceOptions,
      resetUndo,
    } = this.props;

    // Autofocus?
    if (autoFocus && ace.editor) {
      ace.editor.focus();
    }

    // Options
    if (aceOptions && ace.editor) {
      ace.editor.setOptions(aceOptions);
    }

    // Reset undo manager
    setTimeout(() => {
      if (ace.editor) {
        if (resetUndo) {
          ace.editor.getSession().getUndoManager().reset();
        }
        ace.editor.resize();
      }
    }, 0);
  }

  componentWillUpdate(nextProps) {
    if (this.props.size !== nextProps.size) {
      const { ace = {} } = this.refs;
      setTimeout(() => {
        if (ace.editor) {
          ace.editor.resize();
        }
      }, 0);
    }
  }

  render() {
    const {
      value,
      onChange,
      id,
      readOnly,
      theme,
      mode,
      aceStyle,
      aceProps,
    } = this.props;

    return (
      <AceEditor
        ref="ace"
        className="BeafEditor"
        name={id}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        theme={theme}
        mode={mode}
        style={aceStyle}
        $blockScrolling={Infinity}
        {...aceProps}
      />
    );
  }
}
