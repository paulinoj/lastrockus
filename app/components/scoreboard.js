import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../css/scoreboard.css';

class Scoreboard extends Component {
  constructor(props) {
    super(props);
  }

  renderHighScorers() {
    return this.props.musicListHighScorers.map((player) => {
      return (
        <div>
          <div>{player.email}</div>
          <div>{player.score}</div>
        </div>
      )
    });
  }

  render() {
    return (
      <div className={styles.scoreboard}>
        <h1>Scoreboard</h1>
        <div>Your Score:  {this.props.score}
        </div>
        <div>High Scorers:</div>
        {this.renderHighScorers()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { score : state.score,
           musicListHighScorers: state.musicListHighScorers };
}

export default connect(mapStateToProps)(Scoreboard);

