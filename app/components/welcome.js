import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { logoDrop } from '../d3_components/logo_drop';
import styles from '../css/welcome.css';

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
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

