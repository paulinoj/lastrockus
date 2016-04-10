import React from 'react';
import styles from './App.css';
import AnswerBar from './components/answer_bar';
import MusicPlayerGroup from './components/music_player_group';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }
  render() {
    return (
      <div className={styles.app}>
        <AnswerBar />
        <MusicPlayerGroup />
      </div>
    );
  }
}
