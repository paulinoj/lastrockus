import React from 'react';

const StartButton = (props) => {
  console.log(props.numberOfMusicPlayersReady, props.numberOfMusicPlayers);
  console.log(props.numberOfMusicPlayersReady < props.numberOfMusicPlayers);
  return (
    <button disabled={props.numberOfMusicPlayers == 0 || props.numberOfMusicPlayersReady < props.numberOfMusicPlayers} 
    onClick={props.activatePlayers}>start</button>
  )
};

export default StartButton;