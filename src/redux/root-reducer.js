import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import matchReducer from './match/match.reducer';

export default combineReducers({
    users: userReducer,
    matches: matchReducer
});