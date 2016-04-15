import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from '../App.css';
import StartButton from '../components/start_button';
import { incNumberOfMusicPlayersReady } from "../actions/index";
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
        <audio src={song} key={song} ref={playerRef} controls />
      );
    });
  }

  componentDidUpdate() {
    console.log("DID UPDATE");
    let playerRef = "";
    console.log(this.props.numberOfMusicPlayersReady);
    if (this.props.numberOfMusicPlayersReady === 0) {
      this.props.musicList.forEach((song, index) => {
        playerRef = `musicPlayer${index}`;
        this.refs[playerRef].addEventListener("canplaythrough", this.props.incNumberOfMusicPlayersReady);
      });         
    }
  }

  activatePlayers() {
    let playerRef = "";
    this.props.musicList.forEach((song, index) => {
      playerRef = `musicPlayer${index}`;
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
        numberOfMusicPlayersReady={this.props.numberOfMusicPlayersReady}/>
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
    { incNumberOfMusicPlayersReady: incNumberOfMusicPlayersReady,
      resetNumberOfMusicPlayersReady: resetNumberOfMusicPlayersReady }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayerGroup);
