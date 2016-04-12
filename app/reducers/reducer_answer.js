import { ANSWER_SUBMITTED } from '../actions/index.js';

export default function(state = null, action) {
  switch(action.type) {
    case ANSWER_SUBMITTED:
      return action.payload;
  }
  return state;
}