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
    console.log('sanity check (movie should not be null)', this.props.movie);
  }

  render () {
    console.log('movie is definitely not null', this.props.movie);

    return <button onClick={this.handleClose}>click me</button>;
  }
}

const mapStateToProps = (state) => {
  return {
    movie: state.movieInformation.movie
  };
};

export default connect(mapStateToProps)(MovieInformation);
