import { GET_NEW_MUSIC_LIST_ID } from '../actions/index.js';
import { RESET_GAME } from '../actions/index.js';

export default function(state = null, action) {
  switch(action.type) {
    case GET_NEW_MUSIC_LIST_ID:
      return action.payload;
    case RESET_GAME:
      return null;
  }
  return state;
}
