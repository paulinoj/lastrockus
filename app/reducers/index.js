import { combineReducers } from 'redux';
import MusicListReducer from './reducer_music_list';
import Answer from "./reducer_answer";
import NumberOfMusicPlayersReadyReducer from './reducer_number_of_music_players_ready';

const rootReducer = combineReducers({
  musicList: MusicListReducer,
  answer: Answer,
  numberOfMusicPlayersReady: NumberOfMusicPlayersReadyReducer
  // musicStarted: MusicStartedReducer,
  // musicPlayersStatus: MusicPlayersStatusReducer
});

export default rootReducer;