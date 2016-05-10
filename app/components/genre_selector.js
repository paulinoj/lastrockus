import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GenreSelectorButton from './genre_selector_button';
import { getNewMusicList } from "../actions/index";
import styles from '../genre_selector.css';

class GenreSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { answer: '' };
    this.onSelection = this.onSelection.bind(this);
  }

  render() {
    return (
      <div className={styles.genre_selector}>
        <div className="text-center">
        <GenreSelectorButton value="80s" onClick={this.onSelection} />
        <GenreSelectorButton value="Classical" onClick={this.onSelection} />
        <GenreSelectorButton value="Pop" onClick={this.onSelection} />        
        </div>
      </div>
    );
  }

  onSelection(genre) {
    this.props.getNewMusicList(genre);
  }  
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getNewMusicList: getNewMusicList }, dispatch);
}

export default connect(null, mapDispatchToProps)(GenreSelector);

