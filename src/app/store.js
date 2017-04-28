// @flow

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

export default store;
