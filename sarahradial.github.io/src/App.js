import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './components/Header';
import Main from './components/Main';

import './style/standard.css';

class App extends Component {

  // this contains all of the props and states that is needed for this class
  constructor(props) {
    super(props);

    this.state = {
      sidebarOpen: false
    };
  }

  // the below two functions are for the sidebar menu and backdrop color
  sidebarClickHandler = () => {
    this.setState((prevState) => {
      console.log(this.state.sidebarOpen);
      return {sidebarOpen: !prevState.sidebarOpen};
    });
  }

  backdropClickHandler = () => {
    this.setState({sidebarOpen: false});
  }

  render() {
    return (
      <Router>
        <Header sidebarClickHandler={this.sidebarClickHandler}/>
        <Main />
      </Router>
    );
  }
}


export default App;
