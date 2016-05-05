import React from 'react';

const StartButton = (props) => {
  console.log("NUMBER OF MUSIC PLAYERS READY", props.numberOfMusicPlayersReady);
  return (
    <button disabled={props.numberOfMusicPlayers == 0 || props.numberOfMusicPlayersReady < props.numberOfMusicPlayers} 
    onClick={props.activatePlayers}>start</button>
  )
};

export default StartButton;