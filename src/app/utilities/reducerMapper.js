// @flow

export default (reducers, initialState) => {
  return (state, action) => {
    if (typeof state === 'undefined') {
      return initialState;
    }

    if (reducers[action.type]) {
      return reducers[action.type](state, action);
    }

    return state;
  };
};
