import { combineReducers } from 'redux';
import mainReducer from './modules/main/reducer';

const rootReducer = combineReducers({
  main: mainReducer,
});

export default rootReducer;
