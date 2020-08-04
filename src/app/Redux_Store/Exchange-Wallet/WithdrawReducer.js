import {
  ALL_WITHDRAW_BTC,
  ALL_WITHDRAW_USDT,
  WITHDRAW_FETCH_STATUS,
} from '../types';

const initialState = {
  allWithdrawBTC: [],
  allWithdrawUSDT: [],
  withdrawFetchStatus: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ALL_WITHDRAW_BTC:
      return {
        ...state,
        allWithdrawBTC: action.payload,
      };
    case ALL_WITHDRAW_USDT:
      return {
        ...state,
        allWithdrawUSDT: action.payload,
      };

    case WITHDRAW_FETCH_STATUS:
      return {
        ...state,
        withdrawFetchStatus: action.payload,
      };

    default:
      return state;
  }
};
