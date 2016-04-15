import axios from 'axios';

export const ANSWER_SUBMITTED = 'ANSWER_SUBMITTED';
export const GET_NEW_MUSIC_LIST = 'GET_NEW_MUSIC_LIST';
export const ACTIVATE_START_BUTTON = 'ACTIVATE_START_BUTTON';
export const INC_NUMBER_OF_MUSIC_PLAYERS_READY = 'INC_NUMBER_OF_MUSIC_PLAYERS_READY';
export const SWITCH_MUSIC_PLAYER = 'SWITCH_MUSIC_PLAYER';

export function submitAnswer(answer) {
  // if user guesses a song correctly make corresponding music player stop playing
  // and calculate points
  console.log('An answer has been submitted:', answer);
  return {
    type: ANSWER_SUBMITTED,
    payload: answer
  };
}

export function getNewMusicList(genre) {
  genre = genre.toLowerCase();
  console.log('New Selection is: ', genre);
  const url = `music/${genre}`
  const request = axios.get(url);
  return {
    type: GET_NEW_MUSIC_LIST,
    payload: request
  };
}

export function activateStartButton() {
  return {
    type: ACTIVATE_START_BUTTON,
    payload: null
  }
}

export function incNumberOfMusicPlayersReady() {
  console.log("HELLO");
  return {
    type: INC_NUMBER_OF_MUSIC_PLAYERS_READY,
    payload: true
  }
}


