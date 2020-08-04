import {
  ALL_WITHDRAW_BTC,
  ALL_WITHDRAW_USDT,
  WITHDRAW_FETCH_STATUS,
} from '../../../../Redux_Store/types';

//to fetch all withdraw usdt
export const getAllWithdrawUSDT = (data) => ({
  type: ALL_WITHDRAW_BTC,
  payload: data,
});

//to fetch all withdraw BTC
export const getAllWithdrawUBTC = (data) => ({
  type: ALL_WITHDRAW_USDT,
  payload: data,
});

//to get withdrawal status
export const withdrawFetchStatus = (data) => ({
  type: WITHDRAW_FETCH_STATUS,
  payload: data,
});
