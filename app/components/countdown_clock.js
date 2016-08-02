import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../css/countdown_clock.css';

class CountdownClock extends Component {
  constructor(props) {
    super(props);
    this.state = {currentTime: 120000, 
                  timer: null};
    this.setClock = this.setClock.bind(this);
  }

  componentDidMount() {
    console.log("DO WE MOUNT HTE CLOCK");
    this.setState({timer: setInterval(this.setClock, 1000)});
  }

  componentWillUnmount() {
    this.setState({timer: null});
  }

  setClock() {
    var currentTime = this.state.currentTime - 1000;
    this.setState({currentTime: currentTime});
    console.log("SET CLOLCK");
  }

  render() {
    var currentTime = +this.state.currentTime;
    var minutes = Math.floor((currentTime/1000) / 60);
    var seconds = (currentTime/1000) % 60;
    var displayTime=('0'  + minutes).slice(-2)+':'+('0' + seconds).slice(-2);

    return (
      <div className={styles.countdownClock}>
        <div className={styles.center}>
          <div className={styles.time}>
            {displayTime}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null)(CountdownClock);

