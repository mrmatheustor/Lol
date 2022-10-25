import { matchActionTypes } from './match.types';
import { apiBR, apiAmericas } from '../../services/api';

export const setMatch = match => {
  return {
    type: matchActionTypes.SET_CURRENT_MATCH,
    payload: match
  }
}

export const setMatchesId = (matchesId) => {
  return {
    type: matchActionTypes.SET_MATCHES_ID,
    id: matchesId
  }
}

export const setMatches = (matches) => {
  return {
    type: matchActionTypes.SET_MATCHES,
    payload: matches,
  }
}

export const getMatches = (puuid) => {
  return dispatch => {
    apiAmericas
      .get(`/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`)
      .then(response => {
        dispatch(setMatchesId(response.data))
        dispatch(getMatch(response.data))
      })
      .catch(function (error) {
        if (error.response.status)
          alert('Não existem partidas!')
      });
  }
}

export const getMatch = matchId => {
  return dispatch => {
    matchId.map(match => {
      apiAmericas
        .get(`/lol/match/v5/matches/${match}`)
        .then(response => dispatch(setMatches([response.data])))
    })
  }
}