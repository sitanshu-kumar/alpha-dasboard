import {
  ALL_DEPOSIT_BTC,
  ALL_DEPOSIT_USDT,
  DEPOSIT_FETCH_STATUS,
  GET_ADDRESS_BTC,
  GET_ADDRESS_USDT,
} from '../types';

const initialState = {
  allDepositBTC: [],
  allDepositUSDT: [],
  depositFetchStatus: null,
  depositAddressBTC: {},
  depositAddressUSDT: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ALL_DEPOSIT_BTC:
      return {
        ...state,
        allDepositBTC: action.payload,
      };

    case ALL_DEPOSIT_USDT:
      return {
        ...state,
        allDepositUSDT: action.payload,
      };

    case DEPOSIT_FETCH_STATUS:
      return {
        ...state,
        depositFetchStatus: action.payload,
      };
    case GET_ADDRESS_BTC:
      return {
        ...state,
        depositAddressBTC: action.payload.data,
      };
    case GET_ADDRESS_USDT:
      return {
        ...state,
        depositAddressUSDT: action.payload.data,
      };

    default:
      return state;
  }
};
