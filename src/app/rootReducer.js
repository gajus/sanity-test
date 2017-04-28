// @flow

import {
  combineReducers
} from 'redux';
import movieInformation from './views/MovieInformation/ducks';

const rootReducer = {
  movieInformation
};

export default combineReducers(rootReducer);
