import React, { Component } from 'react';
import { connect } from 'react-redux';
import MusicPlayerGroup from './music_player_group';

class Game extends Component {
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

export default connect(mapStateToProps)(Game);