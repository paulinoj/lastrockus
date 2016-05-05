import { START_TIMER } from '../actions/index.js';

export default function(state = null, action) {
  switch(action.type) {
    case START_TIMER:
      return new Date();
  }
  return state;
}
