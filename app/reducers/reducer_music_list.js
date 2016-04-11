import soundcloud from '../../soundcloud.config.js';

export default function() {

  const musicList = 
    [`https://api.soundcloud.com/tracks/25278226/stream?client_id=${soundcloud.key}`,
     `https://api.soundcloud.com/tracks/251024523/stream?client_id=${soundcloud.key}`,
     `https://api.soundcloud.com/tracks/77862534/stream?client_id=${soundcloud.key}`,
     `https://api.soundcloud.com/tracks/30396474/stream?client_id=${soundcloud.key}`];

  return musicList;
}
