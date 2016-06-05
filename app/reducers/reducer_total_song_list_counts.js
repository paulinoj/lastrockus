import { RESET_GAME } from '../actions/index.js';

export default function(state = {}, action) {
  switch(action.type) {
    case RESET_GAME:
      return action.payload.totalSongListCounts;
  }
  return state;
}
