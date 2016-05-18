import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from '../css/song_panel.css';
import Visualizer from './visualizer';
import SongInfo from './song_info';

const SongPanel = (props) => {
  return (
    <div className={styles.songPanel}>
      <Visualizer audioID={props.audioID} color={props.color} show={props.play} />
      <SongInfo audioID={props.audioID} song={props.song} show={!props.play} />
    </div>
  );      
};

export default SongPanel;

