import React from 'react';
import styles from '../css/start_button.css';

const StartButton = (props) => {
  console.log("NUMBER OF MUSIC PLAYERS READY", props.numberOfMusicPlayersReady);
  return (
  	<div className={styles.startButton}>
	  <button disabled={props.numberOfMusicPlayers == 0 || props.numberOfMusicPlayersReady < props.numberOfMusicPlayers} 
	  onClick={props.activatePlayers}>start</button>
    </div>
  )
};

export default StartButton;