import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from '../App.css';
import SongPanel from "./song_panel";
import StartButton from './start_button';
import AnswerBar from './answer_bar';

import { resetNumberOfMusicPlayersReady } from "../actions/index";

class MusicPlayerGroup extends Component {
  constructor(props) {
    super(props);
    // this.state = {test: 'foo'};
    this.activatePlayers = this.activatePlayers.bind(this);
  }

  renderList() {
    if (!this.props.musicList) {
      return <div>Songs loading ...</div>;
    }

    let playerRef = "";
    return this.props.musicList.map((song, index) => {
      playerRef = `musicPlayer${index}`;
      // let newFunc=this.props.signalAllMusicPlayersReady;
      return (
        <SongPanel audioID={playerRef} src={song.url} key={playerRef} />
      );
    });
  }

  activatePlayers() {
    let playerRef = "";
    this.props.musicList.forEach((song, index) => {
      playerRef = `musicPlayer${index}`;
      // ReactDOM.findDOMNode
      this.refs[playerRef].play();
    });
    this.props.resetNumberOfMusicPlayersReady();    
  }

  render() {
    return (
      <div className={styles.app}>
        {this.renderList()}
        <StartButton activatePlayers={this.activatePlayers}
          numberOfMusicPlayers={this.props.musicList.length} 
          numberOfMusicPlayersReady={this.props.numberOfMusicPlayersReady} />
        <AnswerBar musicList={this.props.musicList} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    musicList: state.musicList,
    numberOfMusicPlayersReady: state.numberOfMusicPlayersReady
  };
}

function mapDispatchToProps(dispatch) {
  // Whenever submitAnswer is called, result should be passed to all 
  // of our reducers
  return bindActionCreators(
    { resetNumberOfMusicPlayersReady: resetNumberOfMusicPlayersReady }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayerGroup);
