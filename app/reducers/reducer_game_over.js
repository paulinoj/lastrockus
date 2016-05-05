import { SIGNAL_GAME_OVER } from '../actions/index.js';

export default function(state = false, action) {
  switch(action.type) {
    case SIGNAL_GAME_OVER:
      return true;
  }
  return state;
}
