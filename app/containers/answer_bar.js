import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submitAnswer } from "../actions/index";

class AnswerBar extends Component {
  constructor(props) {
    super(props);
    this.state = { answer: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({answer: event.target.value});
    this.props.submitAnswer(event.target.value);
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.submitAnswer(this.state.answer);
    this.setState({answer: ""});
  }

  render () {
    return (
      <div className="answer-bar">
        <form onSubmit={this.onFormSubmit} className="input-group">
          <input
            placeholder="Guess a song"
            className="form-control" 
            value={this.state.answer}
            onChange={this.onInputChange} />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-secondary">Submit</button>
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