import React from 'react';
import styles from '../song_info.css';

const SongInfo = (props) => {
  var songInfoStyles = styles.songInfo;
  if (!props.show) {
  	songInfoStyles = songInfoStyles + " " + styles.hidden;
  } 
  return (
  	<div className={songInfoStyles}>
	  <div className="row">
	  	<div className="col-xs-9">
		  <h1>{props.song.title}</h1>
		  <div>{props.song.track}</div>
	  	</div>
	  	<div className="col-xs-3">
	  	  <div className={styles.points}>{props.points}</div>
	  	</div>
	  </div>
  	</div>
  )
};

export default SongInfo;