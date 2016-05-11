import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GenreSelectorButton from './genre_selector_button';
import { getNewMusicList } from "../actions/index";
import { resetGame } from "../actions/index";

import styles from '../genre_selector.css';

class GenreSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { answer: '' };
    this.onSelection = this.onSelection.bind(this);
  }

  componentWillMount() {
    this.props.resetGame();
  }

  render() {
    return (
      <div className={styles.genre_selector}>
        <div className="text-center">
        <GenreSelectorButton value="Eighties" onClick={this.onSelection} />
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
  return bindActionCreators({ getNewMusicList: getNewMusicList, 
                              resetGame: resetGame}, dispatch);
}

export default connect(null, mapDispatchToProps)(GenreSelector);

