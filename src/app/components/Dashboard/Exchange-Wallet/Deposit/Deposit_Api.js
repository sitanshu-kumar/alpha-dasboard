import axios from 'axios';
import jwt_decode from 'jwt-decode';
import store from '../../../../Redux_Store/store';
import API from '../../../../Redux_Store/newConfig';

import {
  getAllDepositBTC,
  getAllDepositUSDT,
  depositFetchStatus,
  depositAddressBTC,
  depositAddressUSDT,
} from './DepositDispatchFunction';

class DepositApi {
  constructor() {
    if (localStorage.getItem('token')) {
      axios.defaults.headers.common[
        // eslint-disable-next-line dot-notation
        'Authorization'
      ] = `Bearer ${localStorage.getItem('token')}`;
    }
  }

  // function to fetch all user deposit
  getDeposit = async (symbol) => {
    try {
      const value = await API.get('account/get_deposits', {
        params: {asset_symbol: symbol},
      });
      if (value) {
        if (symbol === 'BTC') {
          store.dispatch(getAllDepositBTC(value.data));
          store.dispatch(depositFetchStatus(true));
        }
        if (symbol === 'USDT') {
          store.dispatch(getAllDepositUSDT(value.data));
          store.dispatch(depositFetchStatus(true));
        }
      }
    } catch (er) {
      store.dispatch(depositFetchStatus(false));
    }
  };

  // function to fetch asset address

  getDepositAddress = async (symbol) => {
    try {
      const value = await API.get('account/get_deposit_address', {
        params: {asset_symbol: symbol},
      });
      if (value) {
        if (symbol === 'BTC') {
          store.dispatch(depositAddressBTC(value.data, true));
        }
        if (symbol === 'USDT') {
          store.dispatch(depositAddressUSDT(value.data, true));
        }
      }
    } catch (er) {
      if (symbol === 'BTC') store.dispatch(depositAddressBTC({}, false));
      if (symbol === 'USDT') store.dispatch(depositAddressUSDT({}, false));
    }
  };
}

export const depositApi = new DepositApi();
