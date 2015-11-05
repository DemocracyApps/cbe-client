import { SET_CARDS_STATE } from '../actions/SiteActions';
import { fromJS } from 'immutable';

function setState (state, newState) {
  return state.merge(newState);
}

export default function cards(state, action) {
  if (state == undefined) {
    state = fromJS( { cards: {} } );
  }

  console.log("In with cards action " + action.type);
  switch (action.type) {

    case SET_CARDS_STATE:
      return setState(state, action.state);

    default:
      return state;
    }
}
