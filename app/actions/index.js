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
export const FETCH_MESSAGE = 'FETCH_MESSAGE';
export const ACTIVATE_MUSIC_PLAYERS = 'ACTIVATE_MUSIC_PLAYERS';
export const START_TIMER = 'START_TIMER';
export const INC_SCORE = 'INC_SCORE';
export const SIGNAL_GAME_OVER = 'SIGNAL_GAME_OVER';
export const RESET_GAME = 'RESET_GAME';

export function submitAnswer(answer) {
  // if user guesses a song correctly make corresponding music player stop playing
  // and calculate points
  console.log('An answer has been submitted:', answer);
  return {
    type: SUBMIT_ANSWER,
    payload: answer
  };
}

export function resetGame() {
  return {
    type: RESET_GAME,
    payload: null
  }  
}

export function getNewMusicList(genre) {
  return function(dispatch) {
    genre = genre.toLowerCase();
    const url = `music/${genre}`;
    axios(url, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({ type: GET_NEW_MUSIC_LIST,
                   payload: response });
        browserHistory.push('/game');
      })
      .catch(response => {
        // JOHN FILL THIS PART IN
        // dispatch(authError(response.data.error));
      });
  }
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

export function activateMusicPlayers() {
  return {
    type: ACTIVATE_MUSIC_PLAYERS,
    payload: true
  }  
}

export function startTimer() {
  return {
    type: START_TIMER,
    payload: null
  }  
}

export function incScore(points) {
  return {
    type: INC_SCORE,
    payload: points
  }  
}

export function signalGameOver(points) {
  return {
    type: SIGNAL_GAME_OVER,
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
        browserHistory.push('/genre_selector');
      })
      .catch(() => {
        // If request is bad ...
        // - Show an error to the user
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function signupUser({ email, password}) {
  return function(dispatch) {
    axios.post('signup', { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/genre_selector');
      })
      .catch(response => {
        dispatch(authError(response.data.error));
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

export function fetchData() {
  return function(dispatch) {
    axios.get('data', {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        })
      });
  }
}

