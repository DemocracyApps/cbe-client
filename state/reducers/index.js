import { combineReducers } from 'redux';
import site from './site';
import cards from './cards';

const rootReducer = combineReducers({
  site,
  cards
});

export default rootReducer;
