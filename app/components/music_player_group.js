import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import styles from '../css/music_player_group.css';
import SongPanel from "./song_panel";
import StartButton from './start_button';
import Loader from './loader';
import Scoreboard from './scoreboard';
import AnswerBar from './answer_bar';
import TimeDisplay from './time_display';

import { activateMusicPlayers } from "../actions/index";
import { resetNumberOfMusicPlayersReady } from "../actions/index";
import { signalGameOver } from "../actions/index";
import { decUserSongListCounts } from "../actions/index";
import { turnOffAllMusicPlayers } from "../actions/index";

class MusicPlayerGroup extends Component {
  constructor(props) {
    var timeLimit = 120000;
    super(props);
    this.activatePlayers = this.activatePlayers.bind(this);
    this.signalGameOver = this.signalGameOver.bind(this);
    this.setTime = this.setTime.bind(this);
    this.state = { gameOver: false,
                   timerControlSwitch: null,
                   timeLimit: timeLimit,
                   timeRemaining: timeLimit };
  }

  componentWillMount() {
    if (this.props.musicList.length === 0) {
      browserHistory.push("/genre_selector");
    }
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
      this.props.signalGameOver(this.props.musicListId, this.props.score);
    }
    else
    {
      if (musicPlayerOffListCount == 5) {
        clearTimeout(this.state.timerControlSwitch);
        this.setState({ gameOver: true });
      }
    }
  }

  componentWillUnmount() {        
    clearTimeout(this.state.timerControlSwitch);
  }

  renderAnswerBar() {
    if (this.props.playersActivated && !this.state.gameOver) {
      return (
        <AnswerBar musicList={this.props.musicList} />
      );
    }
  }

  renderStartButton() {
    if (!this.props.playersActivated) {
      if (this.props.musicList.length > this.props.numberOfMusicPlayersReady) {
        return (
          <div className={styles.start_button}>
            <div className={styles.loader_message}>
              Music Loading
            </div>
            <Loader />
          </div>
        );
      }
      else
      {
        return (
          <div className={styles.start_button}>
            <div className={styles.warning}>CAUTION:  Set the volume on your computer to low before beginning</div>
            <StartButton activatePlayers={this.activatePlayers}
             numberOfMusicPlayers={this.props.musicList.length}
             numberOfMusicPlayersReady={this.props.numberOfMusicPlayersReady} />
          </div>
        );
      }
    }
  }

  renderPlayAgainButton() {
    if (this.state.gameOver) {
      return (
        <div className="btn btn-default btn-lg">
          <Link className="nav-link" to="/genre_selector">Play Again</Link>
        </div>
      );
    }
  }

  renderScreenTop() {
    if (!this.state.gameOver) {
      return (
        <TimeDisplay timeRemaining={this.state.timeRemaining} />
      )
    }
    else
    {
      return (
        <Scoreboard gameOver={this.state.gameOver} />
      )
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
          color={colorList[index]}
          timeLimit={this.state.timeLimit}
          timeRemaining={this.state.timeRemaining}
          gameOver={this.state.gameOver} />
      );
    });
  }

  activatePlayers() {
    this.props.activateMusicPlayers();
    this.props.resetNumberOfMusicPlayersReady();
    this.setState({timerControlSwitch: setInterval(this.setTime, 1000)});
  }

  setTime() {
    var timeRemaining = this.state.timeRemaining - 1000;
    this.setState({timeRemaining: timeRemaining}, function() {
      if (this.state.timeRemaining === 0) {
        this.signalGameOver();
      }
    }.bind(this))
  }

  signalGameOver() {
    this.props.turnOffAllMusicPlayers(this.props.musicList.length);
  }

  render() {
    let show = styles.show;
    if (!this.props.playersActivated) {
      show = styles.hide;      
    }

    return (
      <div className="container">
        <div className={styles.center_vertical}>
          <div className={show}>
            <div className={styles.screen_top}>
              {this.renderScreenTop()}
            </div>
            <div className={styles.screen_middle}>
              {this.renderAnswerBar()}
              {this.renderPlayAgainButton()}
            </div>
            <div className={styles.screen_bottom}>
              {this.renderSongPanels()}
            </div>
          </div>
          {this.renderStartButton()}
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
      signalGameOver: signalGameOver,
      turnOffAllMusicPlayers, turnOffAllMusicPlayers }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayerGroup);
