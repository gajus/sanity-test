// @flow

import reducerMapper from '../../utilities/reducerMapper';
import createAction from '../../utilities/createActionCreator';

export const FETCH_MOVIE = 'FETCH_MOVIE';

const SET_MOVIE = 'SET_MOVIE';
const SET_ERROR = 'SET_ERROR';

const initialState = {
  error: null,
  isFetching: true,
  movie: null,
  playbackState: 'unstarted',
  videoId: null
};

export const fetchMovie = createAction(FETCH_MOVIE);
export const setMovie = createAction(SET_MOVIE);
export const setError = createAction(SET_ERROR);

export default reducerMapper({
  [FETCH_MOVIE]: (state) => {
    return {
      ...state,
      isFetching: true,
      movie: null
    };
  },
  [SET_ERROR]: (state, {payload}) => {
    return {
      ...state,
      error: payload,
      isFetching: false,
      movie: null
    };
  },
  [SET_MOVIE]: (state, {payload}) => {
    return {
      ...state,
      isFetching: false,
      movie: payload
    };
  }
}, initialState);
