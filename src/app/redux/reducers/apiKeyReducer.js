import {GET_ALL_API_SECRET_KEY} from '../types';

const initialState = {
  apisecretkeys: [],
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_API_SECRET_KEY:
      return {
        ...state,
        apiSecretKeysArray: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
