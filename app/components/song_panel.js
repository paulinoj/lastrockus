import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from '../App.css';
import Visualizer from '../containers/visualizer';

import { incNumberOfMusicPlayersReady } from "../actions/index";

class SongPanel extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.refs[this.props.audioID].addEventListener("canplaythrough", this.props.incNumberOfMusicPlayersReady);
  }

  componentDidUpdate() {
    if (this.props.musicPlayersStatus === this.props.audioID) {
      this.refs[this.props.audioID].pause();
    }
  }

  render() {
    return (
      <div className={styles.app}>
        <audio id={this.props.audioID} src={this.props.src} ref={this.props.audioID} controls />
        <Visualizer audioID={this.props.audioID} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    musicPlayersStatus: state.musicPlayersStatus
  };
}

function mapDispatchToProps(dispatch) {
  // Whenever submitAnswer is called, result should be passed to all 
  // of our reducers
  return bindActionCreators(
    // { incNumberOfMusicPlayersReady: incNumberOfMusicPlayersReady,
    //   resetNumberOfMusicPlayersReady: resetNumberOfMusicPlayersReady }, dispatch);
    { incNumberOfMusicPlayersReady: incNumberOfMusicPlayersReady }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SongPanel);
