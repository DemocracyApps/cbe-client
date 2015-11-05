import { combineReducers } from 'redux';
import site from './site';
import cards from './cards';
import datasets from './datasets';

const rootReducer = combineReducers({
  site,
  cards,
  datasets
});

export default rootReducer;
