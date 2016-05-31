import { SET_TOTAL_SONG_LIST_COUNTS } from '../actions/index.js';

export default function(state = {}, action) {
  switch(action.type) {
    case SET_TOTAL_SONG_LIST_COUNTS:
      return action.payload;
  }
  return state;
}
