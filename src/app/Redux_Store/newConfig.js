import axios from 'axios';
import {cond} from 'lodash';

export default axios.create({
  baseURL: 'https://uat.alpha5.io/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
