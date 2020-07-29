import {combineReducers} from 'redux';
import authReducer from './AuthReducer';
import errorReducer from './ErrorReducer';
import profileReducer from './UserProfileReducer';
import apiKeyReducer from './ApiKeyReducer';
import faReducer from './2faReducer';
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  apikeys: apiKeyReducer,
  faReducer: faReducer,
});
