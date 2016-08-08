import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { logoDrop } from '../d3_components/logo_drop';
import styles from '../css/welcome.css';

class Visualizer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.authenticated) {
      browserHistory.push("/genre_selector")
    }
  }

  componentDidMount() {
    let el = ReactDOM.findDOMNode(this);
    let d3Dispatcher = logoDrop(el)
  }

  render () {
    return (
      <div className="welcome">
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { authenticated : state.auth.authenticated };
}

export default connect(mapStateToProps)(Visualizer);

