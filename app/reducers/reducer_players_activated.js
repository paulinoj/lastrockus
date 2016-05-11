import { ACTIVATE_MUSIC_PLAYERS } from '../actions/index.js';
import { RESET_GAME } from '../actions/index.js';

export default function(state = false, action) {
  switch(action.type) {
    case ACTIVATE_MUSIC_PLAYERS:
      console.log("ACTION PAYLOAD MUSIC PLAYERS ACTIVATEd", action.payload);
      return action.payload;
    case RESET_GAME:
      return false;
  }
  return state;
}
