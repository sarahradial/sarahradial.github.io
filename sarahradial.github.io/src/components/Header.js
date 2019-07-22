import React, { Component } from 'react';

import ToggleButton from '../components/ToggleButton';

import '../style/Header.css';

class Header extends Component {
  render() {
    return (
      <header className = 'header'>
        <nav className = 'header-nav'>
          <ToggleButton click = {this.props.sidebarClickHandler} />
          <div className = 'header-logo'> Sarah Anne Yan's Portfolio </div>
          <div className = 'spacer' />
        </nav>
      </header>
    );
  }
}

export default Header;
