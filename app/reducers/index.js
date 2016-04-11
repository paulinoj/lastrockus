import { combineReducers } from 'redux';
import MusicListReducer from './reducer_music_list';
import Answer from "./reducer_answer";

const rootReducer = combineReducers({
  musicList: MusicListReducer,
  answer: Answer
});

export default rootReducer;