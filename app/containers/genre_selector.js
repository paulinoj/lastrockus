import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getNewMusicList } from "../actions/index";

class GenreSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { answer: '' };
  }

  render() {
    return (
      <div className="genre-selector">
        <select onChange={event => this.onSelectionChange(event.target.value)}>
          <option value="80s">80s</option>
          <option value="Classical">Classical</option>
          <option value="Pop">Pop</option>
        </select>
      </div>
    );
  }

  onSelectionChange(genre) {
    this.props.getNewMusicList(genre);
  }  
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getNewMusicList: getNewMusicList }, dispatch);
}

export default connect(null, mapDispatchToProps)(GenreSelector);

