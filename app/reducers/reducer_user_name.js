import { GET_USER_NAME } from '../actions/index.js';

export default function(state = "", action) {
  switch(action.type) {
    case GET_USER_NAME:
      return action.payload;
  }
  return state;
}
