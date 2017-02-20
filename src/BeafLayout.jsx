import React, { Component, PropTypes } from 'react';

import SplitPane from 'react-split-pane';

import BeafHeader from './BeafHeader';
import BeafToolbar from './BeafToolbar';
import BeafPane from './BeafPane';
import BeafEditor from './BeafEditor';

export default class BeafLayout extends Component {
  static defaultProps = {
    HeaderComponent: BeafHeader,
    ToolbarComponent: BeafToolbar,
    InputComponent: BeafEditor,
    OutputComponent: BeafEditor,
    headerProps: {},
    toolbarProps: {},
    paneProps: {},
    inputProps: {
      autoFocus: true,
    },
    outputProps: {
      readOnly: true,
    },

    backgroundColor: '',
    textColor: '',
    fontFamily: '',
    headerBackgroundColor: '',
    headerTextColor: '',
    headerFontFamily: '',
    toolbarBackgroundColor: '',
    toolbarTextColor: '',
    toolbarFontFamily: '',
    subheaderBackgroundColor: '',
    subheaderTextColor: '',
    subheaderFontFamily: '',
    editorFontFamily: '',

    title: 'Beaf',
    titleUrl: 'https://github.com/kmck/beaf',
    menuItems: [{
      name: 'beaf',
      url: 'https://www.npmjs.com/package/beaf',
    }],

    toolbarOptions: [],

    inputTitle: 'Input',
    outputTitle: 'Output',

    localStorageKey: '',
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
    menuOptions: PropTypes.array,

    theme: PropTypes.string,
    inputTitle: PropTypes.string,
    inputMode: PropTypes.string,
    outputTitle: PropTypes.string,
    outputMode: PropTypes.string,

    localStorageKey: PropTypes.string,
    options: PropTypes.object,
    input: PropTypes.string.isRequired,
    output: PropTypes.string.isRequired,
    transform: PropTypes.func.isRequired,

    updateOptions: PropTypes.func,
    updateInput: PropTypes.func.isRequired,
    doInputTransformation: PropTypes.func.isRequired,
  };

  render() {
    const {
      HeaderComponent,
      ToolbarComponent,
      InputComponent,
      OutputComponent,
      headerProps,
      toolbarProps,
      paneProps,
      inputProps,
      outputProps,

      backgroundColor,
      textColor,
      fontFamily,
      headerBackgroundColor,
      headerTextColor,
      headerFontFamily,
      toolbarBackgroundColor,
      toolbarTextColor,
      toolbarFontFamily,
      subheaderBackgroundColor,
      subheaderTextColor,
      subheaderFontFamily,
      editorFontFamily,

      title,
      titleUrl,
      menuItems,

      toolbarOptions,

      theme,
      inputTitle,
      inputMode,
      outputTitle,
      outputMode,

      localStorageKey,
      options,
      input,
      output,
      transform,
      size,

      updateOptions,
      updateInput,
      updateSize,
      doInputTransformation,
    } = this.props;

    const style = {
      backgroundColor,
      color: textColor,
      fontFamily,
    };

    const combinedHeaderProps = {
      options,
      title,
      titleUrl,
      menuItems,
      style: {
        backgroundColor: headerBackgroundColor || backgroundColor,
        color: headerTextColor || textColor,
        fontFamily: headerFontFamily || fontFamily,
      },
      ...headerProps,
    };

    const combinedToolbarProps = {
      options,
      toolbarOptions,
      updateOption: (option, newValue) => {
        updateOptions({ [option]: newValue });
        doInputTransformation(transform, input, {
          ...options,
          [option]: newValue,
        }, localStorageKey);
      },
      style: {
        backgroundColor: toolbarBackgroundColor || headerBackgroundColor || backgroundColor,
        color: toolbarTextColor || headerTextColor || textColor,
        fontFamily: toolbarFontFamily || headerFontFamily || fontFamily,
      },
      ...toolbarProps,
    };

    const combinedPaneProps = {
      headerStyle: {
        backgroundColor: subheaderBackgroundColor || headerBackgroundColor || backgroundColor,
        color: subheaderTextColor || headerTextColor || textColor,
        fontFamily: subheaderFontFamily || headerFontFamily || fontFamily,
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
        doInputTransformation(transform, newValue, options, localStorageKey);
      },
      aceOptions: {
        fontFamily: editorFontFamily,
      },
      ...inputProps,
    };

    const combinedOutputProps = {
      id: 'output',
      value: output,
      mode: outputMode,
      size,
      theme,
      aceOptions: {
        fontFamily: editorFontFamily,
      },
      ...outputProps,
    };

    return (
      <div className="Beaf" style={style}>
        <HeaderComponent {...combinedHeaderProps} />
        <ToolbarComponent {...combinedToolbarProps} />
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
