import React from 'react';
import styles from '../css/genre_selector_button.css';

const GenreSelectorButton = (props) => {
  let classList = "btn btn-default btn-lg " + styles.genre_selector_button;
  const genre = props.value.toLowerCase();
  console.log(props.totalSongListCounts[genre]);
  console.log(props.userSongListCounts[genre]);

  return (
  	<div>
      <button className={classList} 
       type="button" 
       value={props.value} 
       onClick={event => props.onClick(event.target.value)}
       disabled={props.totalSongListCounts[genre] == props.userSongListCounts[genre]}>{props.value}
       </button>
    </div>
  )
};

export default GenreSelectorButton;