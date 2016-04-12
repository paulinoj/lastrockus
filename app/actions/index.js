import axios from 'axios';

export const ANSWER_SUBMITTED = 'ANSWER_SUBMITTED';
export const GET_NEW_MUSIC_LIST = 'GET_NEW_MUSIC_LIST';

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
