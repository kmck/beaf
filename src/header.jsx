import React, { Component } from 'react';

class BeafHeader extends Component {
    render() {
        return (
            <header className="beaf-header">
                <h1 className="title"><a href={this.props.titleUrl}>{this.props.title}</a></h1>
                <ul className="menu">{(() => {
                    this.props.menuItems.map((item) =>
                        <li className="menu-item">
                            <a href={item.url} target="_blank">{item.name}</a>
                        </li>
                    );
                })()}</ul>
            </header>
        );
    }
}

BeafHeader.defaultProps = {
    title: '',
    titleUrl: '',
    menuItems: [],
};

export default BeafHeader;
