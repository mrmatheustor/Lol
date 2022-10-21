import { matchActionTypes } from './match.types';

const INITIAL_STATE = {
  match: null,
  summonerMatches: [],
  summonerMatchesId: []
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case matchActionTypes.SET_CURRENT_MATCH:
      return {
        ...state,
        match: action.payload
      };

    case matchActionTypes.SET_MATCHES:
      return {
        ...state,
        summonerMatches: action.payload,
      }

    case matchActionTypes.SET_MATCHES_ID:
      return {
        ...state,
        summonerMatchesId: action.id
      }

    default:
      return state;
  }
};

export default userReducer;