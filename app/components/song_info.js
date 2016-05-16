import React from 'react';
import styles from '../song_info.css';

const SongInfo = (props) => {
  var songInfoStyles = styles.songInfo;
  if (!props.show) {
  	songInfoStyles = songInfoStyles + " " + styles.hidden;
  } 
  return (
  	<div className={songInfoStyles}>
	  	<div className={styles.flexitem1}>
	  	  <div className={styles.just}>
			<h1>{props.song.title}</h1>
			<div>super cali fragilistic expialidociuos even though </div>
			<div>{props.song.track}</div>
		  </div>
	  	</div>
	  	<div className={styles.flexitem2}>
	  	  <div className={styles.points}>{props.points}</div>
	  	</div>
  	</div>
  )
};

export default SongInfo;