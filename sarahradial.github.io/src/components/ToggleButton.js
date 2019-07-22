import React, { Component } from 'react';

import '../style/ToggleButton.css';

class ToggleButton extends Component {
  render() {
    return (
      <button className ='toggle-btn' onClick={this.props.click}>
        <div className = 'toggle-btn-line' />
        <div className = 'toggle-btn-line' />
        <div className = 'toggle-btn-line' />
      </button>
    );
  }
}

export default ToggleButton;
