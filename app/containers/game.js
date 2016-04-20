import React, { Component } from 'react';
import GenreSelector from './genre_selector'
import MusicPlayerGroup from './music_player_group';

class Game extends Component {
  render() {
    return (
      <div>This is the game
        <GenreSelector />
        <MusicPlayerGroup />
      </div>
    )
  };
}

export default Game;