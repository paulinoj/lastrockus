import React, { Component } from 'react';
import { connect } from 'react-redux';
import MusicPlayer from "../components/music_player";
import styles from '../App.css';

class MusicPlayerGroup extends Component {
  constructor(props) {
    super(props);
    // this.state = {test: 'foo'};
  }
  renderList() {
    if (!this.props.musicList) {
      return <div>Songs loading ...</div>;
    }

    return this.props.musicList.map((song) => {
      return (
        <MusicPlayer song={song} key={song} />
      );
    });
  }

  render() {
    return (
      <div className={styles.app}>
        {this.renderList()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    musicList: state.musicList
  };
}

export default connect(mapStateToProps)(MusicPlayerGroup);
