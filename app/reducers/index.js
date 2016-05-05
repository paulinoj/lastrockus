import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import AuthReducer from './reducer_auth';
import MusicListReducer from './reducer_music_list';
import Answer from "./reducer_answer";
import NumberOfMusicPlayersReadyReducer from './reducer_number_of_music_players_ready';
import MusicPlayersStatusReducer from './reducer_music_players_status';
import PlayersActivatedReducer from './reducer_players_activated';


const rootReducer = combineReducers({
  form: form,
  auth: AuthReducer,
  musicList: MusicListReducer,
  answer: Answer,
  numberOfMusicPlayersReady: NumberOfMusicPlayersReadyReducer,
  musicPlayersStatus: MusicPlayersStatusReducer,
  playersActivated: PlayersActivatedReducer
});

export default rootReducer;