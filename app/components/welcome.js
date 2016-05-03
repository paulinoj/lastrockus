import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { logoDrop } from '../d3_components/logo_drop';
import styles from '../welcome.css';

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let el = ReactDOM.findDOMNode(this);
    let d3Dispatcher = logoDrop(el)
  }

      // <div className="welcome container">

      //       <div className="btn-group btn-group-justified" role="group" aria-label="...">
      //         <div className="btn-group" role="group">
      //           <button type="button" className="btn btn-default">
      //             Sign Up
      //           </button>
      //         </div>
      //       </div>

      //       <div className="btn-group btn-group-justified" role="group" aria-label="...">
      //         <div className="btn-group" role="group">
      //           <button type="button" className="btn btn-default">
      //             Sign Up
      //           </button>
      //         </div>
      //       </div>
      // </div>

  render () {
    return (
      <div className="welcome">
      </div>
    )
  }
}

