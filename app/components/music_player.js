import React from 'react';

const MusicPlayer = (props) => {
  return (
    <div>
      <audio src={props.song} controls>
      </audio>
    </div>
  );
};

export default MusicPlayer;