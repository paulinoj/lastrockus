import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../css/time_display.css';

class TimeDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var timeRemaining = +this.props.timeRemaining;
    var minutes = Math.floor((timeRemaining/1000) / 60);
    var seconds = (timeRemaining/1000) % 60;
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

