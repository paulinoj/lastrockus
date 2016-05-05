import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from '../App.css';
import Visualizer from './visualizer';

import { incNumberOfMusicPlayersReady } from "../actions/index";

class SongPanel extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.refs[this.props.audioID].addEventListener("canplaythrough", this.props.incNumberOfMusicPlayersReady);
  }

  componentDidUpdate() {
     console.log("THIS.PROPS.PLAY", this.props.play);
    if (!this.props.play) {
      this.refs[this.props.audioID].pause();
    }
    else
    {
      this.refs[this.props.audioID].play();
    }
  }

  render() {
    if (!this.props.playersActivated || this.props.play) {
      return (
        <div className={styles.app}>
          <audio id={this.props.audioID} src={this.props.src} ref={this.props.audioID} controls />
          <Visualizer audioID={this.props.audioID} />
        </div>
      );
    }
    else
    {
      return (
        <div className={styles.app}>
          <audio id={this.props.audioID} src={this.props.src} ref={this.props.audioID} controls />
          <div>{this.props.title}</div>
        </div>
      );      
    }
  }
}

function mapStateToProps(state) {
  return {
    playersActivated: state.playersActivated
  };
}

function mapDispatchToProps(dispatch) {
  // Whenever submitAnswer is called, result should be passed to all 
  // of our reducers
  return bindActionCreators(
    { incNumberOfMusicPlayersReady: incNumberOfMusicPlayersReady }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SongPanel);
