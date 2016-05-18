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

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
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
    if (this.d3Dispatcher) {
      this.d3Dispatcher();
    }
  }

  render () {
    var visualizerStyles = styles.visualizer;
    if (!this.props.show) {
      visualizerStyles = visualizerStyles + " " + styles.hidden;
    } 
    return (
      <div className={visualizerStyles}>
      </div>
    )
  }
}
