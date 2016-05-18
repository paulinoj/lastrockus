import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from '../song_info.css';
import { incNumberOfMusicPlayersReady } from "../actions/index";
import { incScore } from "../actions/index";

class SongInfo extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.refs[this.props.audioID].addEventListener("canplaythrough", this.props.incNumberOfMusicPlayersReady);
    this.refs[this.props.audioID].load();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }

  componentDidUpdate() {
    if (this.props.show) {
      this.refs[this.props.audioID].pause();
      this.refs[this.props.audioID].setAttribute("controls","controls");  
      this.props.incScore(this.calcPoints())
    }
    else
    {
      this.refs[this.props.audioID].play();
    }
  }

  componentWillUnmount() {
    // Need this line of code, otherwise, ajax requests hang when you try to backarrow out of this page
    this.refs[this.props.audioID].src = null;
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
  var songInfoStyles = styles.songInfo;
  if (!this.props.show) {
    songInfoStyles = songInfoStyles + " " + styles.hidden;
  } 
    return (
      <div className={songInfoStyles}>
        <div className={styles.flexitem1}>
          <div className={styles.just}>
        <h1>{this.props.song.title}</h1>
        <div>super cali fragilistic expialidociuos even though </div>
        <div>{this.props.song.track}</div>
        </div>
        </div>
        <div>
          <audio id={this.props.audioID} src={this.props.song.url} ref={this.props.audioID} />
        </div>
        <div className={styles.flexitem2}>
          <div className={styles.points}>{this.calcPoints()}</div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    playersActivated: state.playersActivated,
    timerStarted: state.timerStarted,
  };
}

function mapDispatchToProps(dispatch) {
  // Whenever submitAnswer is called, result should be passed to all 
  // of our reducers
  return bindActionCreators(
    { incNumberOfMusicPlayersReady: incNumberOfMusicPlayersReady,
      incScore: incScore }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SongInfo);
