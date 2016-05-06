import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from '../App.css';
import SongPanel from "./song_panel";
import StartButton from './start_button';
import AnswerBar from './answer_bar';

import { activateMusicPlayers } from "../actions/index";
import { resetNumberOfMusicPlayersReady } from "../actions/index";
import { startTimer } from "../actions/index";
import { signalGameOver } from "../actions/index";

class MusicPlayerGroup extends Component {
  constructor(props) {
    super(props);
    // this.state = {test: 'foo'};
    this.activatePlayers = this.activatePlayers.bind(this);
    this.signalGameOver = this.signalGameOver.bind(this);
  }

  renderList() {
    if (!this.props.musicList) {
      return <div>Songs loading ...</div>;
    }

    let playerRef = "";
    let playProp = false;
    // let colorList = ['white', 'white', 'white', 'white', 'white'];
    let colorList = ['#FF83E2', '#FF83E2', '#FF83E2', '#FF83E2', '#FF83E2'];
    // let colorList = ['red', 'blue', 'green', 'yellow', 'orange'];

    return this.props.musicList.map((song, index) => {
      playerRef = `musicPlayer${index}`;
      playProp = this.props.playersActivated && !this.props.musicPlayerOffList[playerRef] && !this.props.gameOver;
      return (
        <SongPanel audioID={playerRef} 
          song={song} 
          key={playerRef} 
          play={playProp} 
          timerStarted={this.props.timerStarted}
          color={colorList[index]} />
      );
    });
  }

  activatePlayers() {
    this.props.activateMusicPlayers();
    this.props.startTimer();
    this.props.resetNumberOfMusicPlayersReady();
    setTimeout(this.signalGameOver, 120000);    
  }

  signalGameOver() {
    this.props.signalGameOver();
  }

  render() {
    return (
      <div className="container">
        {this.renderList()}
        <StartButton activatePlayers={this.activatePlayers}
          numberOfMusicPlayers={this.props.musicList.length} 
          numberOfMusicPlayersReady={this.props.numberOfMusicPlayersReady} />
        <AnswerBar musicList={this.props.musicList} />
        <div>{this.props.score}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    musicList: state.musicList,
    musicPlayerOffList: state.musicPlayerOffList,
    numberOfMusicPlayersReady: state.numberOfMusicPlayersReady,
    playersActivated: state.playersActivated,
    timerStarted: state.timerStarted,
    score: state.score,
    gameOver: state.gameOver
  };
}

function mapDispatchToProps(dispatch) {
  // Whenever submitAnswer is called, result should be passed to all 
  // of our reducers
  return bindActionCreators(
    { resetNumberOfMusicPlayersReady: resetNumberOfMusicPlayersReady,
      activateMusicPlayers: activateMusicPlayers,
      startTimer: startTimer,
      signalGameOver: signalGameOver }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayerGroup);
