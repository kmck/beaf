import React, { createElement, Component } from 'react';

export default class BeafPane extends Component {
  static defaultProps = {
    title: '',
  };

  render() {
    const {
      title,
      paneStyle,
      headerStyle,
      contentStyle,
      component,
      componentProps,
      children,
    } = this.props;

    const childContent = component ?
      createElement(component, componentProps, ...children) :
      children;

    return (
      <div className="BeafPane" style={paneStyle}>
        {!title ? '' : (
          <h3 className="BeafPaneHeader" style={headerStyle}>{title}</h3>
        )}
        <div className="BeafPaneContent" style={contentStyle}>
          {childContent}
        </div>
      </div>
    );
  }
}
