import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import GenreSelector from './genre_selector'
import MusicPlayerGroup from './music_player_group';

class Game extends Component {
  componentWillMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <div>{this.props.message}
        <MusicPlayerGroup />
      </div>
    )
  };
}

function mapStateToProps(state) {
  return {
    message: state.auth.message
  };
}

export default connect(mapStateToProps, actions)(Game);