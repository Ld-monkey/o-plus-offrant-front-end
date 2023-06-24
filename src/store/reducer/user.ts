import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import getLinkImageProfile from '../../api/cats';
import axios from '../../api/axios';

interface UserState {
  registred: boolean;
  logged: boolean;
  logo_profile: string | undefined;
  id: number | null;
  prenom: string | undefined;
  nom: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export const initialState: UserState = {
  registred: false,
  logged: false,
  logo_profile: undefined,
  id: null,
  prenom: undefined,
  nom: null,
  accessToken: null,
  refreshToken: null,
};

export const login = createAsyncThunk(
  'user/login',
  async ({ email, pwd }: { email: string; pwd: string }, thunkApi) => {
    const linkProfile = await getLinkImageProfile();
    return axios
      .post('/api/login', {
        adresse_mail: email,
        mot_de_passe: pwd,
      })
      .then((response) => {
        const accessToken = response?.data.accessToken;
        const refreshToken = response?.data?.refreshToken;

        const { id, prenom, nom }: { id: string; prenom: string; nom: string } =
          jwt_decode(accessToken);

        return [linkProfile, accessToken, refreshToken, id, prenom, nom];
      })
      .catch((error) =>
        thunkApi.rejectWithValue(error?.response?.status || error)
      );
  }
);

export const registrer = createAsyncThunk(
  'user/registrer',
  async (
    {
      firstname,
      lastname,
      email,
      pwd,
      street,
    }: {
      firstname: string;
      lastname: string;
      email: string;
      pwd: string;
      street: string;
    },
    thunkApi
  ) => {
    return axios
      .post('/api/register', {
        prenom: firstname,
        nom: lastname,
        adresse_mail: email,
        mot_de_passe: pwd,
        adresse: street,
      })
      .then((response) => response?.status)
      .catch((error) =>
        thunkApi.rejectWithValue(error?.response?.status || error)
      );
  }
);

export const logout = createAction('user/logout');

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.fulfilled, (state, action) => {
      const [logoProfile, accessToken, refreshToken, id, prenom, nom] =
        action.payload;

      state.logged = true;
      state.logo_profile = logoProfile;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;

      state.id = id;
      state.prenom = prenom;
      state.nom = nom;
    })
    .addCase(login.rejected, (state) => {
      state.logged = false;
    })
    .addCase(registrer.fulfilled, (state) => {
      state.registred = true;
    })
    .addCase(registrer.rejected, (state) => {
      state.registred = false;
    })
    .addCase(logout, (state) => {
      state.logged = false;
      state.logo_profile = undefined;
      state.id = null;
      state.prenom = undefined;
      state.nom = null;
      state.accessToken = null;
    });
});

export default userReducer;
