import { createAction, createReducer } from '@reduxjs/toolkit';

interface UserState {
  logged: boolean;
  // pseudo: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export const initialState: UserState = {
  logged: false,
  // pseudo: null,
  accessToken: null,
  refreshToken: null,
};

export const login = createAction('user/login', (accessToken, refreshToken) => {
  return {
    payload: {
      accessToken,
      refreshToken,
    },
  };
});

export const logout = createAction('user/logout');

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login, (state, action) => {
      const { accessToken } = action.payload;
      state.logged = true;
      // state.pseudo = pseudo;
      state.accessToken = accessToken;
    })
    .addCase(logout, (state, action) => {
      state.logged = false;
      // state.pseudo = null;
      state.accessToken = null;
    });
});

export default userReducer;
