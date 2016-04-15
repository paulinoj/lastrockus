import { SUBMIT_ANSWER } from '../actions/index.js';

export default function(state = "", action) {
  // State will look like {musicPlayer1: true, musicPlayer2: true, musicPlayer3: false, musicPlayer4: true};
  switch(action.type) {
    case SUBMIT_ANSWER:
      let answer = "";
      let playerRef = "";
      action.payload.musicList.forEach((song, index) => {
        playerRef = `musicPlayer${index}`;
        if (action.payload.answer === song.title) {
          answer = playerRef;
        }
      });
      return answer;
  }
  return state;
}
