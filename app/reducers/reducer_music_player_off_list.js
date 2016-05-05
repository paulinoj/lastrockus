import { SUBMIT_ANSWER } from '../actions/index.js';

export default function(state = {}, action) {
  // State will look like {musicPlayer1: true, musicPlayer2: true, musicPlayer3: false, musicPlayer4: true};
  switch(action.type) {
    case SUBMIT_ANSWER:
      let musicPlayerOffList = Object.assign({}, state);
      let playerRef = "";
      action.payload.musicList.forEach((song, index) => {
        playerRef = `musicPlayer${index}`;
        if (action.payload.answer === song.title) {
          musicPlayerOffList[playerRef] = true;
        }
      });
      return musicPlayerOffList;
  }
  return state;
}
