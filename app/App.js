import _ from 'lodash';
import React from 'react';
import styles from './App.css';
import Header from './components/header';

export default class App extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {test: 'foo'};
  }

  check(answer) {
    // if user guesses a song correctly make corresponding music player stop playing
    // and calculate points
    console.log(answer);
  }

  render() {
    // Not sure want to throttle answer checking -- will effect scoring
    const answerCheck = _.debounce((answer) => { this.check(answer) }, 300);

    return (
      <div className={styles.app}>
        <Header />
        {this.props.children}
      </div>
    );
  }
}
