import { GET_NEW_MUSIC_LIST } from '../actions/index.js';

export default function(state = [], action) {
  switch(action.type) {
    case GET_NEW_MUSIC_LIST:
      console.log("INSIDE GET NEW MUSIC LIST REDUCER:", action.payload);
      return action.payload;
  }
  return state;
}
