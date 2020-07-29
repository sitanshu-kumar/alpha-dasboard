import {GET_ALL_API_SECRET_KEY} from '../../../../Redux_Store/types';

// to get all api secret
export const getAllApiSecret = (ar) => ({
  type: GET_ALL_API_SECRET_KEY,
  payload: ar,
});
