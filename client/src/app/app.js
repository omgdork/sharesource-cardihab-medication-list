import React, { Component } from 'react';
import Main from './modules/main';
import { initialState } from './modules/main/reducer';

class App extends Component {
  render() {
    return (<Main {...initialState } />);
  }
}

export default App;
