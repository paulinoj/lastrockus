import React from 'react';

const MusicPlayer = ({song}) => {
  return (
    <div>
      <audio src={song} controls>
      </audio>
    </div>
  );
};

export default MusicPlayer;