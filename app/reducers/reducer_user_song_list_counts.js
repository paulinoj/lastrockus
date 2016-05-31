import { SET_USER_SONG_LIST_COUNTS } from '../actions/index.js';
import { DEC_USER_SONG_LIST_COUNTS } from '../actions/index.js';

export default function(state = {}, action) {
  switch(action.type) {
    case SET_USER_SONG_LIST_COUNTS:
      return action.payload;
    case DEC_USER_SONG_LIST_COUNTS:
      var newState = {...state};
      newState[action.payload]++;
      return newState;
  }
  return state;
}
