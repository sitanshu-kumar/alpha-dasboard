const initialState = {
  secret_key_2fa: '',
  secret_key_response_msg: null,
  invalidSecrectkey: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SECRET_KEY':
      return {
        ...state,
        secret_key_2fa: action.payload,
      };
      return state;

    case 'SECRET_KEY_UPDATE_STATUS':
      return {
        ...state,
        secret_key_response_msg: action.payload,
      };

    case 'SET_SECRET_KEY_ERROR':
      return {
        ...state,
        invalidSecrectkey: action.payload,
      };
    default:
      return state;
  }
};
