import { ANSWER_SUBMITTED } from '../actions/index.js';
import { RESET_GAME } from '../actions/index.js';

export default function(state = null, action) {
  switch(action.type) {
    case ANSWER_SUBMITTED:
      return action.payload;
    case RESET_GAME:
      return null;
  }
  return state;
}