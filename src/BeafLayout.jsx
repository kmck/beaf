import React, { Component, PropTypes } from 'react';

import SplitPane from 'react-split-pane';

import BeafHeader from './BeafHeader';
import BeafPane from './BeafPane';
import BeafEditor from './BeafEditor';

class BeafLayout extends Component {
  static defaultProps = {
    HeaderComponent: BeafHeader,
    InputComponent: BeafEditor,
    OutputComponent: BeafEditor,
    headerProps: {},
    paneProps: {},
    inputProps: {
      autoFocus: true,
    },
    outputProps: {
      readOnly: true,
    },

    backgroundColor: '',
    textColor: '',
    headerBackgroundColor: '',
    headerTextColor: '',
    subheaderBackgroundColor: '',
    subheaderTextColor: '',

    title: 'Beaf',
    titleUrl: 'https://github.com/kmck/beaf',
    menuItems: [{
      name: 'beaf',
      url: 'https://www.npmjs.com/package/beaf',
    }],

    inputTitle: 'Input',
    outputTitle: 'Output',

    localStorageKey: '',
    defaultOptions: {},
    options: {},
    input: '',
    output: '',
    transform: input => input,
  };

  static propTypes = {
    HeaderComponent: PropTypes.func,
    InputComponent: PropTypes.func,
    OutputComponent: PropTypes.func,

    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    headerBackgroundColor: PropTypes.string,
    headerTextColor: PropTypes.string,
    subheaderBackgroundColor: PropTypes.string,
    subheaderTextColor: PropTypes.string,

    title: PropTypes.string,
    titleUrl: PropTypes.string,
    menuItems: PropTypes.array,

    theme: PropTypes.string,
    inputTitle: PropTypes.string,
    inputMode: PropTypes.string,
    outputTitle: PropTypes.string,
    outputMode: PropTypes.string,

    localStorageKey: PropTypes.string,
    defaultOptions: PropTypes.object,
    options: PropTypes.object,
    input: PropTypes.string.isRequired,
    output: PropTypes.string.isRequired,
    transform: PropTypes.func.isRequired,

    updateInput: PropTypes.func.isRequired,
    doInputTransformation: PropTypes.func.isRequired,
  };

  render() {
    const {
      HeaderComponent,
      InputComponent,
      OutputComponent,
      headerProps,
      paneProps,
      inputProps,
      outputProps,

      backgroundColor,
      textColor,
      headerBackgroundColor,
      headerTextColor,
      subheaderBackgroundColor,
      subheaderTextColor,

      title,
      titleUrl,
      menuItems,

      theme,
      inputTitle,
      inputMode,
      outputTitle,
      outputMode,

      localStorageKey,
      defaultOptions,
      options,
      input,
      output,
      transform,
      size,

      updateInput,
      updateSize,
      doInputTransformation,
    } = this.props;

    const style = {
      backgroundColor,
      color: textColor,
    };

    const combinedOptions = { ...defaultOptions, ...options };

    const combinedHeaderProps = {
      options: combinedOptions,
      title,
      titleUrl,
      menuItems,
      style: {
        backgroundColor: headerBackgroundColor || backgroundColor,
        color: headerTextColor || textColor,
      },
      ...headerProps,
    };

    const combinedPaneProps = {
      headerStyle: {
        backgroundColor: subheaderBackgroundColor || headerBackgroundColor || backgroundColor,
        color: subheaderTextColor || headerTextColor || textColor,
      },
      ...paneProps,
    };

    const combinedInputProps = {
      id: 'input',
      value: input,
      mode: inputMode,
      size,
      theme,
      onChange: (newValue) => {
        updateInput(newValue, localStorageKey);
        doInputTransformation(transform, newValue, combinedOptions, localStorageKey);
      },
      ...inputProps,
    };

    const combinedOutputProps = {
      id: 'output',
      value: output,
      mode: outputMode,
      size,
      theme,
      ...outputProps,
    };

    return (
      <div className="Beaf" style={style}>
        <HeaderComponent {...combinedHeaderProps} />
        <main className="BeafPanes">
          <SplitPane
            split="vertical"
            minSize={150}
            maxSize={document.body.clientWidth - 150}
            defaultSize="50%"
            onChange={newSize => updateSize(newSize)}
          >
            <BeafPane {...combinedPaneProps} title={inputTitle}>
              <InputComponent {...combinedInputProps} />
            </BeafPane>
            <BeafPane {...combinedPaneProps} title={outputTitle}>
              <OutputComponent {...combinedOutputProps} />
            </BeafPane>
          </SplitPane>
        </main>
      </div>
    );
  }
}

export default BeafLayout;
