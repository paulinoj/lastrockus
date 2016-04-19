import { AUTH_USER } from '../actions/index';
import { UNAUTH_USER } from '../actions/index';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_USER: 
      return { ...state, authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
  }
  return state;
}