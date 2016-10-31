import React, { Component } from 'react';

class BeafHeader extends Component {
  static defaultProps = {
    title: '',
    titleUrl: '',
    menuItems: [],
  }

  render() {
    const {
      titleUrl,
      title,
      menuItems,
      style,
    } = this.props;

    return (
      <header className="BeafHeader" style={style}>
        <h1 className="BeafHeaderTitle">
          {!titleUrl ? title : (
            <a href={titleUrl}>{title}</a>
          )}
        </h1>

        <ul className="BeafHeaderMenu">
          {menuItems.map((item, i) => (
            <li className="BeafHeaderMenuItem" key={i}>
              <a href={item.url} target="_blank">{item.name}</a>
            </li>
          ))}
        </ul>
      </header>
    );
  }
}

export default BeafHeader;
