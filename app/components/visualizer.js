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
  }

  componentDidUpdate() {
    let el = ReactDOM.findDOMNode(this);
    if (this.props.show) {
      this.d3Dispatcher = createVisualization(el, this.props.audioID, this.props.color);      
    }
    else
    {
      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }
    }    
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

