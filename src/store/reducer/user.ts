import { createAction, createReducer } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

interface UserState {
  logged: boolean;
  id: number | null;
  prenom: string | null;
  nom: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export const initialState: UserState = {
  logged: false,
  id: null,
  prenom: null,
  nom: null,
  accessToken: null,
  refreshToken: null,
};

export const login = createAction('user/login', (accessToken, refreshToken) => {
  const {id, prenom, nom } = jwt_decode(accessToken);
  return {
    payload: {
      id: id,
      prenom: prenom,
      nom: nom,
      accessToken,
      refreshToken,
    },
  };
});

export const logout = createAction('user/logout');

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login, (state, action) => {
      const { id, prenom, nom, accessToken } = action.payload;
      state.logged = true;
      state.id = id;
      state.prenom = prenom;
      state.nom = nom;
      state.accessToken = accessToken;
    })
    .addCase(logout, (state, action) => {
      state.logged = false;
      state.id = null;
      state.prenom = null;
      state.nom = null;
      state.accessToken = null;
    });
});

export default userReducer;
