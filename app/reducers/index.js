import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import MusicListReducer from './reducer_music_list';
import Answer from "./reducer_answer";
import NumberOfMusicPlayersReadyReducer from './reducer_number_of_music_players_ready';
import MusicPlayersStatusReducer from './reducer_music_players_status';

const rootReducer = combineReducers({
  form: form,
  musicList: MusicListReducer,
  answer: Answer,
  numberOfMusicPlayersReady: NumberOfMusicPlayersReadyReducer,
  musicPlayersStatus: MusicPlayersStatusReducer
});

export default rootReducer;