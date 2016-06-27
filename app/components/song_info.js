import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import styles from '../css/song_info.css';
import { incNumberOfMusicPlayersReady } from "../actions/index";
import { incScore } from "../actions/index";

class SongInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { requestErrorCount: 0 };
    this.handleRequestError = this.handleRequestError.bind(this);
  }

  handleRequestError(e) {
    let audioPlayer = this.refs[this.props.audioID];
    console.log("AN ERROR OCCURRED, ", e.target.error.code);
    this.setState({ requestErrorCount: this.state.requestErrorCount + 1 });
    if (this.state.requestErrorCount == 3) {
      alert("AN ERROR HAS OCCURRED -- PLEASE TRY AGAIN");
      browserHistory.push('/genre_selector');
    }
    else {
      audioPlayer.src = this.props.song.url;
    }
  }

  componentDidMount() {
    let audioPlayer = this.refs[this.props.audioID];
    audioPlayer.addEventListener("canplaythrough", this.props.incNumberOfMusicPlayersReady);
    audioPlayer.addEventListener("error", this.handleRequestError);
    audioPlayer.load();
    audioPlayer.currentTime = 20;
    audioPlayer.volume = this.props.song.volume;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }

  componentDidUpdate() {
    if (this.props.show) {
      this.refs[this.props.audioID].pause();
      this.refs[this.props.audioID].setAttribute("controls","controls");  
      this.props.incScore(this.calcPoints());
    }
    else
    {
      this.refs[this.props.audioID].play();
    }
  }

  componentWillUnmount() {
    let audioPlayer = this.refs[this.props.audioID];
    audioPlayer.removeEventListener("error", this.handleRequestError);
    // Need this line of code, otherwise, ajax requests hang when you try to backarrow out of this page
    audioPlayer.src = null;
  }

  calcPoints() {
    let numSongs = 5;
    let totalTime = 60;
    let timeElapsed = Math.floor(new Date() - this.props.timerStarted)/1000;
    let points = Math.round((totalTime - timeElapsed)/numSongs);
    return points;
  }

  render() {
  var songInfoStyles = styles.songInfo;
  if (!this.props.show) {
    songInfoStyles = songInfoStyles + " " + styles.hidden;
  } 
    return (
      <div className={songInfoStyles}>
        <div className={styles.songInfo2}>
          <div className={styles.flexitem1}>
            <div className={styles.just}>
              <a href={this.props.song.permalink_url} target="_blank">
                <h1 className={styles.title}>{this.props.song.title} - {this.props.song.artist}</h1>
                <div>Soundcloud Content Creator: {this.props.song.soundcloudUser}</div>
              </a>
            </div>
          </div>
          <div className={styles.flexitem2}>
            <audio id={this.props.audioID} src={this.props.song.url} ref={this.props.audioID} />
          </div>
        </div>

        <div className={styles.flexitem3}>
          <div className={styles.points}>{this.calcPoints()} points</div>
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
