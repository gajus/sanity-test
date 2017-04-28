// @flow

import {
  createStore
} from 'redux';
import rootReducer from './rootReducer';

export default (initialState, history) => {
  return createStore(
    rootReducer,
    initialState
  );
};
