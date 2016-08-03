import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../css/time_display.css';

class TimeDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var currentTime = +this.props.currentTime;
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

export default TimeDisplay;

