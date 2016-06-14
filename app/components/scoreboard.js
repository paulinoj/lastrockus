import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../css/scoreboard.css';

class Scoreboard extends Component {
  constructor(props) {
    super(props);
  }

  renderHighScorers() {
    if (this.props.musicListHighScorers.length !== 0) {
      let list = this.props.musicListHighScorers.map((player) => {
        if (player) {
          return (
            <div className={styles.tableWidth} >
            <table >
              <col width="175" />
              <col width="25" />
              <tr>
                <td>{player.email}</td>
                <td className={styles.right}>{player.score}</td>
              </tr>
            </table>
            </div>
          )
        }
      });
      if (this.props.gameOver) {
        return (
          <div className={styles.highScorers}>
            <div className={styles.centerHeading}>High Scorers:</div>
            <div className={styles.highScorersList}>
              {list}
            </div>
          </div>
        );
      }
    }
  }

  render() {
    return (
      <div className={styles.scoreboard}>
          <div className={styles.score}>
            <div className={styles.center}>Your Score:  {this.props.score}
            </div>
          </div>
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

