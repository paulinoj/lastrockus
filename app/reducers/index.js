import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import AuthReducer from './reducer_auth';
import MusicListReducer from './reducer_music_list';
import MusicListIdReducer from './reducer_music_list_id';
import MusicListHighScorersReducer from './reducer_music_list_high_scorers';
import NumberOfMusicPlayersReadyReducer from './reducer_number_of_music_players_ready';
import musicPlayerOffListReducer from './reducer_music_player_off_list';
import PlayersActivatedReducer from './reducer_players_activated';
import ScoreReducer from './reducer_score';
import TotalSongListCountsReducer from './reducer_total_song_list_counts';
import UserSongListCountsReducer from './reducer_user_song_list_counts';

const rootReducer = combineReducers({
  form: form,
  auth: AuthReducer,
  musicList: MusicListReducer,
  musicListId: MusicListIdReducer,
  musicListHighScorers: MusicListHighScorersReducer,
  numberOfMusicPlayersReady: NumberOfMusicPlayersReadyReducer,
  musicPlayerOffList: musicPlayerOffListReducer,
  playersActivated: PlayersActivatedReducer,
  score: ScoreReducer,
  totalSongListCounts: TotalSongListCountsReducer,
  userSongListCounts: UserSongListCountsReducer
});

export default rootReducer;