import React, { Component } from 'react';

export default class BeafToolbar extends Component {
  static defaultProps = {
    toolbarOptions: [],
  }

  renderInput = (option, currentValue, updateOption) => {
    const {
      name,
      key,
      type,
      options = [],
    } = option;

    const inputOptions = {
      id: `option-${key}`,
      name: key,
      onChange: (event, value = event.currentTarget.value) => {
        updateOption(key, value);
      },
      ...option.inputOptions,
    };

    switch (type) {
      case 'text':
      case 'number':
        return (
          <label htmlFor={`option-${key}`}>
            <input
              {...inputOptions}
              type={type}
              value={currentValue}
            />
            {name}
          </label>
        );
      case 'checkbox':
        return (
          <label htmlFor={`option-${key}`}>
            <input
              {...inputOptions}
              type="checkbox"
              checked={!!currentValue}
              onChange={(event, checked = event.currentTarget.checked) => {
                updateOption(key, !!checked);
              }}
            />
            {name}
          </label>
        );
      case 'select':
        return (
          <label htmlFor={`option-${key}`}>
            <select
              {...inputOptions}
              value={currentValue}
              children={options.map((value, i) => (
                <option key={i} value={value}>{value}</option>
              ))}
            />
            {name}
          </label>
        );
      default:
        return (
          <label htmlFor={`option-${key}`}>
            <input
              {...inputOptions}
              type="text"
              value={currentValue}
            />
            {name}
          </label>
        );
    }
  }

  render() {
    const {
      options,
      toolbarOptions,
      updateOption,
      style,
    } = this.props;

    if (!(toolbarOptions && toolbarOptions.length)) {
      return null;
    }

    return (
      <form className="BeafToolbar" style={style}>
        <ul className="BeafToolbarOptions">
          {toolbarOptions.map((option, i) => (
            <li className="BeafToolbarOption" key={i}>
              {this.renderInput(option, options[option.key], updateOption)}
            </li>
          ))}
        </ul>
      </form>
    );
  }
}
