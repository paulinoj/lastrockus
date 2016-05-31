import { SUBMIT_ANSWER } from '../actions/index.js';
import { RESET_GAME } from '../actions/index.js';
import { TURN_OFF_ALL_MUSIC_PLAYERS } from '../actions/index.js';

export default function(state = {}, action) {
  // State will look like {musicPlayer1: true, musicPlayer2: true, musicPlayer3: false, musicPlayer4: true};

  let musicPlayerOffList = Object.assign({}, state);
  let playerRef = "";

  switch(action.type) {
    case SUBMIT_ANSWER:
      action.payload.musicList.forEach((song, index) => {
        playerRef = `musicPlayer${index}`;
        if (action.payload.answer === song.title) {
          musicPlayerOffList[playerRef] = true;
        }
      });
      return musicPlayerOffList;
    case TURN_OFF_ALL_MUSIC_PLAYERS:
      for (var i = 0; i < action.payload; i++) {
        playerRef = `musicPlayer${i}`;
        musicPlayerOffList[playerRef] = true;
      }
      return musicPlayerOffList;
    case RESET_GAME:
      return {};
  }
  return state;
}
