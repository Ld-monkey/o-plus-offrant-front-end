import alertReducer from './alerts';
import userReducer from './user';

const reducer = {
  user: userReducer,
  alert: alertReducer,
};

export default reducer;
