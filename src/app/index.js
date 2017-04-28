// @flow

import {
  AppContainer
} from 'react-hot-loader';
import ReactDOM from 'react-dom';
import React from 'react';
import configureStore from './configureStore';

const store = configureStore();

/**
 * @see https://github.com/reactjs/redux/pull/667#issuecomment-255372420
 */
if (module.hot && module.hot.accept && typeof module.hot.accept === 'function') {
  module.hot.accept('./rootReducer', () => {
    // eslint-disable-next-line global-require
    const nextRootReducer = require('./rootReducer').default;

    store.replaceReducer(nextRootReducer);
  });
}

/**
 * https://github.com/ReactTraining/react-router/issues/2704#issuecomment-261310093
 */
const render = () => {
  // eslint-disable-next-line global-require
  const App = require('./App').default;

  ReactDOM.render(
    <App store={store} />,
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
