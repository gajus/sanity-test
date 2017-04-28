// @flow

import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';
import {
  setMovie
} from './ducks';

class MovieInformation extends Component {
  componentDidMount = () => {
    this.props.dispatch(setMovie('test'));
  };

  handleClose = (self) => {
    console.log('sanity check (movie should not be null)', this.props);
  }

  render () {
    return <button onClick={this.handleClose}>click me</button>;
  }
}

const mapStateToProps = (state): $Shape<MovieTimesPropsType> => {
  return {
    movie: state.movieInformation.movie
  };
};

export default connect(mapStateToProps)(MovieInformation);
