import { userActionTypes } from './user.types';
import { apiBR } from '../../services/api';
import { getMatches } from '../match/match.actions';

export const setUser = user => {
  return {
    type: userActionTypes.SET_CURRENT_USER,
    payload: user
  }
}

export const setUserLeague = userLeague => {
  return {
    type: userActionTypes.SET_CURRENT_USER_LEAGUE,
    payload: userLeague
  }
}

export const setLoading = loading => {
  return {
    type: userActionTypes.SET_LOADING,
    payload: loading
  }
}


export const getUser = userName => {
  return dispatch => {
    apiBR
      .get(`/lol/summoner/v4/summoners/by-name/${userName}`)
      .then(response => {
        dispatch(setUser(response.data))
        dispatch(getUserLeague(response.data.id))
        dispatch(getMatches(response.data.puuid))
        dispatch(setLoading(false))
      })
      .catch(function (error) {
        if (error.response.status){
          alert('Nome de invocador não existe')
        }
        dispatch(setLoading(false))
        console.log(error)
      });
  }
}

const getUserLeague = summonerId => {
  return dispatch => {
    apiBR
      .get(`/lol/league/v4/entries/by-summoner/${summonerId}`)
      .then(res => dispatch(setUserLeague(res.data)))
  }
}