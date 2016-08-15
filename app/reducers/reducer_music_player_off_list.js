import { SUBMIT_ANSWER } from '../actions/index.js';
import { RESET_GAME } from '../actions/index.js';
import { TURN_OFF_ALL_MUSIC_PLAYERS } from '../actions/index.js';
import FuzzySet from '../fuzzyset.js';

export default function(state = {}, action) {

  // State will look like {musicPlayer1: true, musicPlayer2: true, musicPlayer3: false, musicPlayer4: true};

  let musicPlayerOffList = Object.assign({}, state);
  let playerRef = "";
  let fuzzyDict = FuzzySet();
  let titleList = [];
  let altTitleList = [];
  let matchArr, matchValue, matchName, guess, songTitle, altSongTitle,
      guessIndex, altGuessIndex, origSentenceLength, sentenceLength;

  function normalizeString(string) {
    string = string.toLowerCase().trim();
    string = string.replace(/^(The|An|A)\s+/i, "");
    string = string.replace(/\s{2,}/g, " ");
    return string;
  } 

  switch(action.type) {
    case SUBMIT_ANSWER:
      guess = normalizeString(action.payload.answer);
      action.payload.musicList.forEach((song, index) => {
        songTitle = normalizeString(song.title);
        titleList.push(songTitle);
        fuzzyDict.add(songTitle);
        if (song.alt_title) {
          altSongTitle = normalizeString(song.alt_title);
          altTitleList.push(altSongTitle);
          fuzzyDict.add(altSongTitle);          
        }
        else
        {
          altTitleList.push(null);
        }
      });
      origSentenceLength = guess.split(" ").length;
      sentenceLength = origSentenceLength;
      while (sentenceLength > 0 && sentenceLength >= origSentenceLength - 3) {
        matchArr = fuzzyDict.get(guess);
        if (matchArr) {
          matchValue = matchArr[0][0];
          matchName = matchArr[0][1];
        }
        if (matchValue > 0.8) {
          guessIndex = titleList.indexOf(matchName);
          if (guessIndex !== -1) {
            playerRef = `musicPlayer${guessIndex}`;
            musicPlayerOffList[playerRef] = true;
            return musicPlayerOffList;
          }
          altGuessIndex = altTitleList.indexOf(matchName);
          if (altGuessIndex !== -1) {
            playerRef = `musicPlayer${altGuessIndex}`;
            musicPlayerOffList[playerRef] = true;
            return musicPlayerOffList;
          }
        }
        sentenceLength--;
        guess = guess.split(" ");
        guess.length = sentenceLength;
        guess = guess.join(" ");
      }
      return musicPlayerOffList;
    case TURN_OFF_ALL_MUSIC_PLAYERS:
      for (var i = 0; i < action.payload; i++) {
        playerRef = `musicPlayer${i}`;
        musicPlayerOffList[playerRef] = true;
      }
      return musicPlayerOffList;
    case RESET_GAME:
      return {};
  }
  return state;
}
