// @flow

import React from 'react';
import {
  Provider
} from 'react-redux';
import MovieInformation from './views/MovieInformation';
import store from './store';

class App extends React.Component {
  render () {
    return <Provider store={store}>
      <MovieInformation match={{params: {id: '1103518'}}} />
    </Provider>;
  }
}

export default App;
