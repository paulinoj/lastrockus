import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createVisualization } from '../d3_components/visualization';
import styles from '../visualizer.css';


export default class Visualizer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let el = ReactDOM.findDOMNode(this);
    let d3Dispatcher = createVisualization(el, this.props.audioID, this.props.color)
  }

  render () {
    return (
      <div className={styles.visualizer}>
      </div>
    )
  }
}

