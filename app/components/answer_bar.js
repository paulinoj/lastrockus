import React, { Component } from 'react';

class AnswerBar extends Component {
  constructor(props) {
    super(props);
    this.state = { answer: '' };
  }

  render () {
    return (
      <div className="search-bar">
        <input 
          value={this.state.answer}
          onChange={event => this.onInputChange(event.target.value)} />;
      </div>
    )
  }

  onInputChange(answer) {
    this.setState({answer});
    this.props.onAnswerChange(answer);
  }
}

export default AnswerBar;