import { createAction, createReducer } from '@reduxjs/toolkit';
import { IAlerts } from '../../@types/alerts';

const initialState: IAlerts = {
  message: '',
  type: undefined,
  timeout: 3000,
};

export const createAlert = createAction(
  'alert/create',
  ({ message, type, timeout }: IAlerts) => {
    return {
      payload: {
        message,
        type,
        timeout,
      },
    };
  }
);
export const destroyAlert = createAction('alert/destroy');

const alertReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createAlert, (state, action) => {
      const { message, type, timeout } = action.payload;
      state.message = message;
      state.type = type;
      state.timeout = timeout;
    })
    .addCase(destroyAlert, (state) => {
      state.message = undefined;
      state.type = undefined;
    });
});

export default alertReducer;
