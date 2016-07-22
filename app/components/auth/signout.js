import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import styles from '../../css/signout.css';


class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return (
      <div className={styles.signout}>Thank you for playing Rockus.</div>
    )
  }
}

export default connect(null, actions)(Signout);