import { GET_NEW_MUSIC_LIST_HIGH_SCORERS } from '../actions/index.js';
import { RESET_GAME } from '../actions/index.js';

export default function(state = [], action) {
  switch(action.type) {
    case GET_NEW_MUSIC_LIST_HIGH_SCORERS:
      return action.payload;
    case RESET_GAME:
      return [];
  }
  return state;
}
