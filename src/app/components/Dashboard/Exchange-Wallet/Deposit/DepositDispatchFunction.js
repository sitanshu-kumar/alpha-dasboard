import {
  ALL_DEPOSIT_BTC,
  ALL_DEPOSIT_USDT,
  DEPOSIT_FETCH_STATUS,
  GET_ADDRESS_BTC,
  GET_ADDRESS_USDT,
} from '../../../../Redux_Store/types';

//to fetch all deposit history btc
export const getAllDepositBTC = (data) => ({
  type: ALL_DEPOSIT_BTC,
  payload: data,
});

//to fetch all deposit history usdt
export const getAllDepositUSDT = (data) => ({
  type: ALL_DEPOSIT_USDT,
  payload: data,
});

//to get  desposit fetch status
export const depositFetchStatus = (data) => ({
  type: DEPOSIT_FETCH_STATUS,
  payload: data,
});

//to get  desposit address btc
export const depositAddressBTC = (data, status) => ({
  type: GET_ADDRESS_BTC,
  payload: {data, status},
});

//to get  desposit address usdt
export const depositAddressUSDT = (data, status) => ({
  type: GET_ADDRESS_USDT,
  payload: {data, status},
});
