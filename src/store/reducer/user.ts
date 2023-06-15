import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

import axios from '../../api/axios';

interface UserState {
  logged: boolean;
  pseudo: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export const initialState: UserState = {
  logged: false,
  pseudo: null,
  accessToken: null,
  refreshToken: null,
};

export const login = createAsyncThunk(
  'user/login',
  async (formData: FormData) => {
    const [email, pwd] = formData.values();
    const reponse = await axios.post('/api/login', {
      adresse_mail: email,
      mot_de_passe: pwd,
    });

    console.log('reponse :', reponse);

    const accessToken = reponse?.data.accessToken;
    const refreshToken = reponse?.data.refreshToken;
    return [accessToken, refreshToken];
  }
);

export const logout = createAction('user/logout');

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.fulfilled, (state, action) => {
      const { pseudo, accessToken } = action.payload;

      state.logged = true;
      state.pseudo = pseudo;
      state.accessToken = accessToken;
    })
    .addCase(login.rejected, (state, action) => {
      state.logged = false;
      state.pseudo = null;
      state.accessToken = null;
    })
    .addCase(logout, (state, action) => {
      state.logged = false;
      state.pseudo = null;
      state.token = null;
    });
});

export default userReducer;
