import { INC_SCORE } from '../actions/index.js';
import { RESET_GAME } from '../actions/index.js';

export default function(state = 0, action) {
  switch(action.type) {
    case INC_SCORE:
      return state + action.payload;
    case RESET_GAME:
      return 0;
  }
  return state;
}
