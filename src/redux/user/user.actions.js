import { userActionTypes } from './user.types';
import {apiBR} from '../../services/api';

export const setUser = user => {
  return {
    type: userActionTypes.SET_CURRENT_USER,
    payload: user
  }
}

export const getUser = userName => {
  console.log(userName)
  return dispatch => {
      apiBR
        .get(`/lol/summoner/v4/summoners/by-name/${userName}`)
        .then(response => dispatch(setUser(response.data)))
        .catch(function (error) {
            console.log(error)
          });
      }
}

// let nextTodoId = 0
// export const getUser = (content) => ({
//   type: userActionTypes.SET_CURRENT_USER,
//   payload: content
// })