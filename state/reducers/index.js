//import { combineReducers } from 'redux';
import site from './site';
import cards from './cards';
import data from './data';

// const rootReducer = combineReducers({
//   site,
//   cards,
//   datasets
// });

// export default rootReducer;

/*
 * Not using Redux combineReducers because I prefer something this simple to be explicit in the code.
 */
export default function rootReducer (state = {}, action) {
  return {
    site:   site (state.site, action),
    cards:  cards (state.cards, action),
    data:   data (state.data, action)
  }
}