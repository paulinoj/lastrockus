import axios from 'axios';
import { browserHistory } from 'react-router';

export const GET_NEW_MUSIC_LIST = 'GET_NEW_MUSIC_LIST';
export const ACTIVATE_START_BUTTON = 'ACTIVATE_START_BUTTON';
export const INC_NUMBER_OF_MUSIC_PLAYERS_READY = 'INC_NUMBER_OF_MUSIC_PLAYERS_READY';
export const RESET_NUMBER_OF_MUSIC_PLAYERS_READY = 'RESET_NUMBER_OF_MUSIC_PLAYERS_READY';
export const SUBMIT_ANSWER = 'SUBMIT_ANSWER';
export const AUTH_USER = 'AUTH_USER';
export const UNAUTH_USER = 'UNAUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';

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
    axios.post('signin', { email, password })
      .then(response => {
        // If request is good ...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });

        // - Save the JWT token in LocalStorage
        localStorage.setItem('token', response.data.token);

        // - redirect to the route '/feature'
        browserHistory.push('/feature');
      })
      .catch(() => {
        // If request is bad ...
        // - Show an error to the user
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}


