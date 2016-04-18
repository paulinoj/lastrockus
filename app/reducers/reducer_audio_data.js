import { GET_AUDIO_DATA } from '../actions/index.js';

var sampleData = [
  {id: '5fbmzmtc', x: 7, y: 41, z: 6},
  {id: 's4f8phwm', x: 11, y: 45, z: 9},
];

export default function(state = {data: sampleData, domain: {x: [0, 30], y: [0, 100]}}, action) {
  switch(action.type) {
    case GET_AUDIO_DATA:
      return action.payload.data;
  }
  return state;
}
