// @flow

import {
  AppContainer
} from 'react-hot-loader';
import ReactDOM from 'react-dom';
import React from 'react';

/**
 * https://github.com/ReactTraining/react-router/issues/2704#issuecomment-261310093
 */
const render = () => {
  // eslint-disable-next-line global-require
  const App = require('./App').default;

  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
};

render();

if (module.hot) {
  // $FlowFixMe
  module.hot.accept('./App', () => {
    render();
  });
}
