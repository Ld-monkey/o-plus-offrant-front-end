import { createAction, createReducer } from '@reduxjs/toolkit';
import { IAlerts } from '../../@types/alerts';

const initialState: IAlerts = {
  message: '',
  type: undefined,
};

export const createAlert = createAction(
  'alert/create',
  ({ message, type }: IAlerts) => {
    return {
      payload: {
        message,
        type,
      },
    };
  }
);
export const destroyAlert = createAction('alert/destroy');

const alertReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createAlert, (state, action) => {
      const { message, type } = action.payload;
      state.message = message;
      state.type = type;
    })
    .addCase(destroyAlert, (state) => {
      state.message = undefined;
      state.type = undefined;
    });
});

export default alertReducer;
