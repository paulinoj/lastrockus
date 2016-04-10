import React, { Component } from 'react';
import MusicPlayer from "./music_player";
import styles from '../App.css';

export default class MusicPlayerGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }
  render() {
    return (
      <div className={styles.app}>
        <MusicPlayer />
      </div>
    );
  }
}

export default MusicPlayerGroup;
