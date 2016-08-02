import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submitAnswer } from "../actions/index";
import styles from '../css/answer_bar.css';

class AnswerBar extends Component {
  constructor(props) {
    super(props);
    this.state = { answer: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ answer: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.submitAnswer({answer: this.state.answer, musicList: this.props.musicList});
    this.setState({ answer: "" });
  }

  render () {
    var inputBoxStyles = "form-control " + styles.input_box;
    var buttonStyles = "btn btn-secondary " + styles.button;
    return (
      <div className={styles.answer_bar}>
        <form onSubmit={this.onFormSubmit} className="input-group">
          <input
            placeholder="Guess a song"
            className={inputBoxStyles} 
            value={this.state.answer}
            onChange={this.onInputChange} />
          <span className="input-group-btn">
            <button type="submit" className={buttonStyles}>Submit</button>
          </span>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  // Whenever submitAnswer is called, result should be passed to all 
  // of our reducers
  return bindActionCreators({ submitAnswer: submitAnswer }, dispatch);
}

export default connect(null, mapDispatchToProps)(AnswerBar);