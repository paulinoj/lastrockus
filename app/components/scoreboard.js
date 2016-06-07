import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from '../css/genre_selector.css';

class Scoreboard extends Component {
  constructor(props) {
    super(props);
    this.state = { answer: '' };
    this.onSelection = this.onSelection.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  renderHighScorers() {
    return this.props.highScorers.map(player) {
      return (
        <div>{player.userName}</div>
        <div>{player.score}</div>
      )
    }
  }

  render() {
    return (
      <div className={styles.scoreboard}>
        <h1>Scoreboard</h1>
        <div>Your Score:  {this.props.userScore}
        </div>
        <div>High Scorers:</div>
        {this.renderHighScorers}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { score : state.score,
           highScorers: state.highScorers };
}

export default connect(mapStateToProps)(Scoreboard);

