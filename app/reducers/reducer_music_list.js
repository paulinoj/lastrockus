import { GET_NEW_MUSIC_LIST } from '../actions/index.js';
import { RESET_GAME } from '../actions/index.js';

export default function(state = [], action) {
  switch(action.type) {
    case GET_NEW_MUSIC_LIST:
      return action.payload.data;
    case RESET_GAME:
      return [];
  }
  return state;
}
