import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import styles from '../css/song_info.css';
import MusicController from './music_controller';

class SongInfo extends Component {
  constructor(props) {
    super(props);
  }

  renderMusicController() {
    if (this.props.gameOver) {
      return (
        <MusicController audioID={this.props.audioID} player={this.props.player} />
      )
    }
    else
    {
      return (
        <div></div>
      )
    }
  }

  render() {
    return (
      <div className={styles.songInfo}>
        <div className={styles.songInfo2}>
          <div className={styles.first_panel}>
            <a href={this.props.song.permalink_url} target="_blank">
              <h1 className={styles.title}>{this.props.song.title} - {this.props.song.artist}</h1>
              <div>Soundcloud Content Creator: {this.props.song.soundcloudUser}</div>
            </a>
          </div>
          <div className={styles.middle_panel}>
            {this.renderMusicController()}
          </div>
        </div>
        <div className={styles.last_panel}>
          <div className={styles.points}>{this.props.score} points</div>
        </div>
      </div>
    );
  }
};

export default connect(null, null)(SongInfo);
