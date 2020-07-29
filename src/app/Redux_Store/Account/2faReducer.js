const initialState = {
  secret_key_2fa: '',
  error: '',
};

export default (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case 'SET_SECRET_KEY':
      state.secret_key_2fa = action.payload;
      return state;

    case 'SET_SECRET_KEY_ERROR':
      state.error = action.payload;
      return state;
    default:
      return state;
  }
};
