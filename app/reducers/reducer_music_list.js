import { GET_NEW_MUSIC_LIST } from '../actions/index.js';

export default function(state = [], action) {
  switch(action.type) {
    case GET_NEW_MUSIC_LIST:
      return action.payload.data;
  }
  return state;
}
