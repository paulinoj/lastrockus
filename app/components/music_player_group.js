import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import styles from '../css/music_player_group.css';
import SongPanel from "./song_panel";
import StartButton from './start_button';
import Scoreboard from './scoreboard';
import AnswerBar from './answer_bar';

import { activateMusicPlayers } from "../actions/index";
import { resetNumberOfMusicPlayersReady } from "../actions/index";
import { startTimer } from "../actions/index";
import { signalGameOver } from "../actions/index";
import { decUserSongListCounts } from "../actions/index";
import { turnOffAllMusicPlayers } from "../actions/index";

class MusicPlayerGroup extends Component {
  constructor(props) {
    super(props);
    this.activatePlayers = this.activatePlayers.bind(this);
    this.signalGameOver = this.signalGameOver.bind(this);
    this.state = { gameOver: false,
                   musicPlayersControl: null };
  }

  componentDidUpdate() {
    // count number of properties in musicPlayerOffList
    var musicPlayerOffListCount = 0;
    var musicPlayerOffList = this.props.musicPlayerOffList;
    for (var player in musicPlayerOffList) {
      if (musicPlayerOffList.hasOwnProperty(player)) {
        musicPlayerOffListCount++;
      }
    }
    if (this.state.gameOver) {
      console.log("HIGH SCORERS");
      console.log(this.props.musicListHighScorers);
      this.props.signalGameOver(this.props.musicListId, this.props.score);
    }
    else
    {
      if (musicPlayerOffListCount == 5) {
        clearTimeout(this.state.musicPlayersControl);
        this.setState({ gameOver: true });
      }
    }
  }

  renderSongPanels() {
    if (!this.props.musicList) {
      return <div>Songs loading ...</div>;
    }

    let playerRef = "";
    let playProp = false;
    let colorList = ['white', 'white', 'white', 'white', 'white'];
    // let colorList = ['#FF83E2', '#FF83E2', '#FF83E2', '#FF83E2', '#FF83E2'];
    // let colorList = ['red', 'blue', 'green', 'yellow', 'orange'];

    return this.props.musicList.map((song, index) => {
      playerRef = `musicPlayer${index}`;
      playProp = this.props.playersActivated && !this.props.musicPlayerOffList[playerRef] && !this.state.gameOver;
      return (
        <SongPanel audioID={playerRef} 
          song={song} 
          key={playerRef} 
          play={playProp} 
          color={colorList[index]} />
      );
    });
  }

  activatePlayers() {
    this.props.activateMusicPlayers();
    this.props.startTimer();
    this.props.resetNumberOfMusicPlayersReady();
    this.setState({musicPlayersControl: setTimeout(this.signalGameOver, 60000)});
  }

  signalGameOver() {
    this.props.turnOffAllMusicPlayers(this.props.musicList.length);
  }

  render() {
    let songPanelVisibility = styles.show;
    let startButtonVisibility = styles.show;      

    if (this.props.playersActivated) {
      startButtonVisibility = styles.hide;      
    }
    else
    {
      songPanelVisibility = styles.hide;      
    }

    return (
      <div className="container">
        <Scoreboard />
        <AnswerBar musicList={this.props.musicList} />
        <div className={songPanelVisibility}>
          {this.renderSongPanels()}
        </div>
        <div className={startButtonVisibility}>
          <StartButton activatePlayers={this.activatePlayers}
            numberOfMusicPlayers={this.props.musicList.length} 
            numberOfMusicPlayersReady={this.props.numberOfMusicPlayersReady} />
        </div>
        <div className="btn btn-default">
          <Link className="nav-link" to="/genre_selector">Play Again</Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    musicList: state.musicList,
    musicListId: state.musicListId,
    musicListHighScorers: state.musicListHighScorers,
    musicPlayerOffList: state.musicPlayerOffList,
    numberOfMusicPlayersReady: state.numberOfMusicPlayersReady,
    playersActivated: state.playersActivated,
    timerStarted: state.timerStarted,
    score: state.score
  };
}

function mapDispatchToProps(dispatch) {
  // Whenever submitAnswer is called, result should be passed to all 
  // of our reducers
  return bindActionCreators(
    { resetNumberOfMusicPlayersReady: resetNumberOfMusicPlayersReady,
      decUserSongListCounts: decUserSongListCounts,
      activateMusicPlayers: activateMusicPlayers,
      startTimer: startTimer,
      signalGameOver: signalGameOver,
      turnOffAllMusicPlayers, turnOffAllMusicPlayers }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayerGroup);
