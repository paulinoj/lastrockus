import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createVisualization } from '../d3_components/visualization';
import styles from '../visualizer.css';

export default class Visualizer extends Component {

  constructor(props) {
    super(props);
    this.d3Dispatcher = null;
  }

  componentDidMount() {
    let el = ReactDOM.findDOMNode(this);
    this.d3Dispatcher = createVisualization(el, this.props.audioID, this.props.color);
  }

  componentWillUnmount() {
    console.log("COMPONENT UNMOUNTED");
    this.d3Dispatcher();
  }

  render () {
    return (
      <div className={styles.visualizer}>
      </div>
    )
  }
}

