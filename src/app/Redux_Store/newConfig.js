import axios from 'axios';
const token = localStorage.getItem('token');
export default axios.create({
  baseURL: 'https://dev.bitfex.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    Authorization: `Bearer ${token}`,
  },
});
