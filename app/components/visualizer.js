import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createVisualization } from '../d3_components/visualization';

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let el = ReactDOM.findDOMNode(this);
    let d3Dispatcher = createVisualization(el, this.props.audioID)
  }

  render () {
    return (
      <div className="visualizer">
      </div>
    )
  }
}

