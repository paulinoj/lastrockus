import React from 'react';
import styles from './App.css';
import AnswerBar from './components/answer_bar';
import MusicPlayerGroup from './components/music_player_group';
import soundcloud from '../soundcloud.config.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {test: 'foo'};
  }

  render() {
    const musicList = 
      ['https://api.soundcloud.com/tracks/25278226/stream?client_id=' + soundcloud.key,
       'https://api.soundcloud.com/tracks/251024523/stream?client_id=' + soundcloud.key,
       'https://api.soundcloud.com/tracks/77862534/stream?client_id=' + soundcloud.key,
       'https://api.soundcloud.com/tracks/30396474/stream?client_id=' + soundcloud.key]

    return (
      <div className={styles.app}>
        <AnswerBar />
        <MusicPlayerGroup musicList={musicList} />
      </div>
    );
  }
}
