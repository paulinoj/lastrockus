import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from '../css/song_panel.css';
import Visualizer from './visualizer';
import SongInfo from './song_info';
import { incNumberOfMusicPlayersReady } from "../actions/index";
import { incScore } from "../actions/index";


class SongPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { requestErrorCount: 0, player: null, score: 0 };
    this.handleRequestError = this.handleRequestError.bind(this);
    this.prepAudioElement = this.prepAudioElement.bind(this);
  }

  handleRequestError(e) {
    console.log("AN ERROR OCCURRED, ", e.target.error.code);
    this.setState({ requestErrorCount: this.state.requestErrorCount + 1 });
    if (this.state.requestErrorCount == 3) {
      alert("AN ERROR HAS OCCURRED -- PLEASE TRY AGAIN");
      browserHistory.push('/genre_selector');
    }
    else {
      this.state.player.src = this.props.song.url;
    }
  }

  prepAudioElement(e) {
    e.target.removeEventListener("canplay", this.prepAudioElement);

    // Need to play then immediately pause audio element in order to set currentTime
    // successfully in Safari
    e.target.play();
    e.target.pause();
    e.target.currentTime = 20;
    // e.target.addEventListener("durationchange", function() {console.log("DURATION CHANGE")});
    e.target.volume = this.props.song.volume;
    this.props.incNumberOfMusicPlayersReady();
  }

  componentDidMount() {
    this.setState({player: this.refs[this.props.audioID]},
      function() {
        this.state.player.addEventListener("canplay", this.prepAudioElement);
        this.state.player.addEventListener("error", this.handleRequestError);
        // DO WE NEED THIS LOAD METHOD?
        this.state.player.load();
      }.bind(this));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.play !== this.props.play) || nextProps.gameOver || (nextState.score !== this.state.score);
  }

  componentDidUpdate() {
    var score;
    if (this.props.gameOver) {
      this.state.player.pause();
      this.state.player.currentTime = 0;
      // this.state.player.setAttribute("controls","controls");
    }

    else if (!this.props.play && this.state.score == 0) {
      score = this.calcPoints();
      this.props.incScore(score);
      this.setState({ score: score });
    }
    else
    {
      this.state.player.play();
    }
  }

  componentWillUnmount() {
    this.state.player.removeEventListener("error", this.handleRequestError);
    // Need this line of code, otherwise, ajax requests hang when you try to backarrow out of this page
    this.state.player.src = null;
  }

  calcPoints() {
    let numSongs = 5;
    let totalTime = 30;
    let timeElapsed = Math.floor(new Date() - this.props.timerStarted)/1000;
    let points = Math.round((totalTime - timeElapsed)/numSongs);
    return points;
  }

  renderSongInfo() {
    if ((!this.props.play && this.props.playersActivated) || this.props.gameOver) {
      return (
        <SongInfo audioID={this.props.audioID} song={this.props.song}
         player={this.state.player} score={this.state.score} gameOver={this.props.gameOver} />
      )
    }
  }

  render() {
    return (
      <div className={styles.songPanel}>
        <audio id={this.props.audioID} src={this.props.song.url} ref={this.props.audioID} />
        <Visualizer audioID={this.props.audioID} color={this.props.color} show={this.props.play} />
        {this.renderSongInfo()}
      </div>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(SongPanel);
