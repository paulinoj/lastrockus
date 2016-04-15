import React from 'react';

const StartButton = (props) => {
  return (
    <button disabled={props.numberOfMusicPLayersReady < props.numberOfMusicPlayers} 
    onClick={props.activatePlayers}>start</button>
  )
};

export default StartButton;