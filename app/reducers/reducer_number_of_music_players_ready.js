import { INC_NUMBER_OF_MUSIC_PLAYERS_READY } from '../actions/index.js';
import { RESET_NUMBER_OF_MUSIC_PLAYERS_READY } from '../actions/index.js';
import { RESET_GAME } from '../actions/index.js';

export default function(state = 0, action) {
  switch(action.type) {
    case INC_NUMBER_OF_MUSIC_PLAYERS_READY:
      console.log("INSIDE INC_NUMBER_OF_MUSIC_PLAYERS_READY REDUCER:", action.payload);
      let total = state + 1;
      return total;
    case RESET_NUMBER_OF_MUSIC_PLAYERS_READY:
      return 0;
    case RESET_GAME:
      return 0;
  }
  return state;
}
