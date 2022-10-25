import { userActionTypes } from './user.types';

const INITIAL_STATE = {
  user: null,
  userLeague: null,
  loading: false
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
      case userActionTypes.SET_CURRENT_USER:
          return {
              ...state,
              user: action.payload
          };

      case userActionTypes.SET_CURRENT_USER_LEAGUE:
        return {
          ...state,
          userLeague: action.payload
        }

      case userActionTypes.SET_LOADING:
        return {
          ...state,
          loading: action.payload
        }

      default:
          return state;
  }
};

export default userReducer;