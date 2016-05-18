import React from 'react';
import styles from '../css/genre_selector_button.css';

const GenreSelectorButton = (props) => {
  let classList = "btn btn-default btn-lg " + styles.genre_selector_button;
  return (
  	<div>
      <button className={classList} 
       type="button" 
       value={props.value} 
       onClick={event => props.onClick(event.target.value)}>{props.value}</button>
    </div>
  )
};

export default GenreSelectorButton;