import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from '../App.css';
import Visualizer from './visualizer';

import { incNumberOfMusicPlayersReady } from "../actions/index";
import { incScore } from "../actions/index";


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
      this.props.incScore(this.calcPoints())
    }
    else
    {
      this.refs[this.props.audioID].play();
    }
  }

  calcPoints() {
    let points = 0;
    let timeElapsed = Math.floor(new Date() - this.props.timerStarted)/1000;
    if (timeElapsed < 30) {
      points = 20;
    }
    else if (timeElapsed < 60) {
      points = 15;
    }
    else if (timeElapsed < 90) {
      points = 10;
    }
    else if (timeElapsed < 120) {
      points = 5;
    }
    else
    {
      points = 0;
    }
    return points;
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
          <div>{new Date() - this.props.timerStarted}</div>
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
    { incNumberOfMusicPlayersReady: incNumberOfMusicPlayersReady,
      incScore: incScore }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SongPanel);
