const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SECRET_KEY':
      return {
        ...state,
        secret_key_2fa: action.payload,
      };
      return state;

    default:
      return state;
  }
};
