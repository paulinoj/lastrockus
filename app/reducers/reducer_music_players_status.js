import { SWITCH_MUSIC_PLAYER } from '../actions/index.js';

export default function(state = [], action) {
  switch(action.type) {
    case SWITCH_MUSIC_PLAYER:
      console.log("SWITCH_MUSIC_PLAYER REDUCER:", action.payload);
      return action.payload;
  }
  return state;
}
