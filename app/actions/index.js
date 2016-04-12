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


// SETUP FOR TEST PURPOSES ONLY
import soundcloud from '../../soundcloud.config.js';



export function getNewMusicList(genre) {
  genre = genre.toLowerCase();
  console.log('New Selection is: ', genre);
  const url = `music/${genre}`
  const request = axios.get(url);


  // DATA FOR TEST PURPOSES ONLY
  const musicList = 
    [`https://api.soundcloud.com/tracks/25278226/stream?client_id=${soundcloud.key}`,
     `https://api.soundcloud.com/tracks/251024523/stream?client_id=${soundcloud.key}`,
     `https://api.soundcloud.com/tracks/77862534/stream?client_id=${soundcloud.key}`,
     `https://api.soundcloud.com/tracks/30396474/stream?client_id=${soundcloud.key}`];


  return {
    type: GET_NEW_MUSIC_LIST,
    // payload: request
    payload: musicList
  };
}