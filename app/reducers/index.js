import { combineReducers } from 'redux';
import MusicListReducer from './reducer_music_list';

const rootReducer = combineReducers({
  musicList: MusicListReducer
});

export default rootReducer;