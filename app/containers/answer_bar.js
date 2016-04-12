import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submitAnswer } from "../actions/index";

class AnswerBar extends Component {
  constructor(props) {
    super(props);
    this.state = { answer: '' };
  }

  render () {
    return (
      <div className="answer-bar">
        <form className="input-group">
          <input 
            value={this.state.answer}
            onChange={event => this.onInputChange(event.target.value)} />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-secondary">Submit</button>
          </span>
        </form>
      </div>
    )
  }

  onInputChange(answer) {
    this.setState({answer});
    this.props.submitAnswer(answer);
  }
}

function mapDispatchToProps(dispatch) {
  // Whenever submitAnswer is called, result should be passed to all 
  // of our reducers
  return bindActionCreators({ submitAnswer: submitAnswer }, dispatch);
}

export default connect(null, mapDispatchToProps)(AnswerBar);