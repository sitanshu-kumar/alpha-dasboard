import {combineReducers} from 'redux';
import authReducer from './Account/AuthReducer';
import errorReducer from './Account/ErrorReducer';
import profileReducer from './Account/UserProfileReducer';
import apiKeyReducer from './Account/ApiKeyReducer';
import faReducer from './Account/2faReducer';
import balanceReducer from './Exchange-Wallet/BalanceReducer';
import depositReducer from './Exchange-Wallet/DepositReducer';
import withdrawReducer from './Exchange-Wallet/WithdrawReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  apikeys: apiKeyReducer,
  faReducer: faReducer,
  balance: balanceReducer,
  deposit: depositReducer,
  withdraw: withdrawReducer,
});
