export function submitAnswer(answer) {
  // if user guesses a song correctly make corresponding music player stop playing
  // and calculate points
  console.log('An answer has been submitted:', answer);
  return {
    type: 'ANSWER_SUBMITTED',
    payload: answer
  };
}

export function getNewMusicList(genre) {
  console.log('New Selection is: ', genre);
  return {
    type: 'GET_NEW_MUSIC_LIST',
    payload: genre
  };
}