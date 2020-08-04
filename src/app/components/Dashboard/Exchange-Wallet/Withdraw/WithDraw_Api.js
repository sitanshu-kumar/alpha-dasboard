import axios from 'axios';
import jwt_decode from 'jwt-decode';
import store from '../../../../Redux_Store/store';
import API from '../../../../Redux_Store/newConfig';

import {
  getAllWithdrawUSDT,
  getAllWithdrawUBTC,
  withdrawFetchStatus,
} from './WithDrawDispatchFunction';

class WithdrawApi {
  constructor() {
    if (localStorage.getItem('token')) {
      axios.defaults.headers.common[
        // eslint-disable-next-line dot-notation
        'Authorization'
      ] = `Bearer ${localStorage.getItem('token')}`;
    }
  }

  // function to fetch all  withdraw
  getWithdraw = async (symbol) => {
    try {
      const value = await API.get('account/get_withdrawals', {
        params: {asset_symbol: symbol},
      });
      if (value) {
        if (symbol === 'BTC') {
          store.dispatch(getAllWithdrawUBTC(value.data));
          store.dispatch(withdrawFetchStatus(true));
        }
        if (symbol === 'USDT') {
          store.dispatch(getAllWithdrawUSDT(value.data));
          store.dispatch(withdrawFetchStatus(true));
        }
      }
    } catch (er) {
      store.dispatch(withdrawFetchStatus(false));
    }
  };

  // function to post withdrawal request

  sendWithdrawRequest = async (data) => {
    try {
      const value = await API.post('/account/withdraw', data);
    } catch (er) {}
  };
  //function to cancel withdrawal request
  cancelWithdrawRequest = async (withdrawal_id) => {
    try {
      const value = await API.post('/account/cancel', withdrawal_id);
    } catch (er) {}
  };

  //function to cancel withdrawal request
  confirmWithdrawRequest = async (data) => {
    try {
      const value = await API.post('/account/confirm', data);
    } catch (er) {}
  };
}

export const withdrawApi = new WithdrawApi();
