import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GenreSelectorButton from './genre_selector_button';
import { getNewMusicList } from "../actions/index";
import { resetGame } from "../actions/index";

import styles from '../css/genre_selector.css';

class GenreSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { answer: '' };
    this.onSelection = this.onSelection.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.props.resetGame();

    console.log("INSIDE COMPONENTDID MOUNT TOTAL,", this.props.totalSongListCounts);
    console.log("INSIDE COMPONENTDID MOUNT USER,", this.props.userSongListCounts);
  }

  render() {
    return (
      <div className={styles.genre_selector}>
        <div className="text-center">
        <GenreSelectorButton value="Eighties" onClick={this.onSelection} totalSongListCounts={this.props.totalSongListCounts} userSongListCounts={this.props.userSongListCounts} />
        <GenreSelectorButton value="Classical" onClick={this.onSelection} totalSongListCounts={this.props.totalSongListCounts} userSongListCounts={this.props.userSongListCounts} />
        <GenreSelectorButton value="Pop" onClick={this.onSelection} totalSongListCounts={this.props.totalSongListCounts} userSongListCounts={this.props.userSongListCounts} />
        </div>
      </div>
    );
  }

  onSelection(genre) {
    this.props.getNewMusicList(genre);
  }  
}

function mapStateToProps(state) {
  return { totalSongListCounts: state.totalSongListCounts,
           userSongListCounts: state.userSongListCounts };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getNewMusicList: getNewMusicList, 
                              resetGame: resetGame}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GenreSelector);

