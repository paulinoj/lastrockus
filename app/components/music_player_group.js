import React, { Component } from 'react';
import MusicPlayer from "./music_player";
import styles from '../App.css';

export default class MusicPlayerGroup extends Component {
  constructor(props) {
    super(props);
    // this.state = {test: 'foo'};
  }
  render() {
    const musicPlayers = this.props.musicList.map((song) => {
      return (
        <MusicPlayer song={song} key={song} />
      )
    });

    return (
      <div className={styles.app}>
        {musicPlayers}
      </div>
    );
  }
}

export default MusicPlayerGroup;
