import React from 'react';
import styles from '../song_info.css';

const SongInfo = (props) => {
  return (
  	<div className={styles.songInfo}>
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