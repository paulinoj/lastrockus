import { SIGNAL_GAME_OVER } from '../actions/index.js';
import { RESET_GAME } from '../actions/index.js';

export default function(state = false, action) {
  switch(action.type) {
    case SIGNAL_GAME_OVER:
      return true;
    case RESET_GAME:
      return false;
  }
  return state;
}
