import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';

class Main extends Component {
  render() {
    return (
      <div className = 'page-wrapper'>
        <Switch>
          <Route path='/' exact component={Home} />
        </Switch>
      </div>
    );
  }
}
export default Main;
