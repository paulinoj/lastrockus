import React, { Component } from 'react';

class AnswerBar extends Component {
  constructor(props) {
    super(props);
    this.state = { answer: '' };
  }

  render () {
    return <input value={this.state.answer} onChange={this.onInputChange} />;
  }

  onInputChange(event) {
    this.setState({answer: event.target.value});
  }
}

export default AnswerBar;