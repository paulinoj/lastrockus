import axios from 'axios';

export const GET_NEW_MUSIC_LIST = 'GET_NEW_MUSIC_LIST';
export const ACTIVATE_START_BUTTON = 'ACTIVATE_START_BUTTON';
export const INC_NUMBER_OF_MUSIC_PLAYERS_READY = 'INC_NUMBER_OF_MUSIC_PLAYERS_READY';
export const RESET_NUMBER_OF_MUSIC_PLAYERS_READY = 'RESET_NUMBER_OF_MUSIC_PLAYERS_READY';
export const SUBMIT_ANSWER = 'SUBMIT_ANSWER';

export function submitAnswer(answer) {
  // if user guesses a song correctly make corresponding music player stop playing
  // and calculate points
  console.log('An answer has been submitted:', answer);
  return {
    type: SUBMIT_ANSWER,
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
  return {
    type: INC_NUMBER_OF_MUSIC_PLAYERS_READY,
    payload: true
  }
}

export function resetNumberOfMusicPlayersReady() {
  return {
    type: RESET_NUMBER_OF_MUSIC_PLAYERS_READY,
    payload: null
  }  
}

export function signinUser({ email, password }) {
  return function(dispatch) {
    // Submit email/password to the server

    // If request is good ...
    // - Update state to indicate user is authenticated
    // - Save the JWT token
    // - redirect to the route '/feature'

    // If request is bad ...
    // - Show an error to the user
  }
}


