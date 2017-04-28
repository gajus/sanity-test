// @flow

export default (type) => {
  return (payload) => {
    return {
      payload,
      type
    };
  };
};
