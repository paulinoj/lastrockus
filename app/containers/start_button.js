import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startMusic } from "../actions/index";

export default class StartButton extends Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick() {
    this.props.activatePlayers();
  }

  render() {
    return (
      <button disabled={this.props.numberOfMusicPLayersReady < this.props.numberOfMusicPlayers} onClick={this.onButtonClick}>start</button>
    );
  }
}

