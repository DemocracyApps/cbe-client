import { SET_SITE_STATE, GOTO_PAGE } from '../actions/siteActions';
import { fromJS } from 'immutable';

function setState (state, newState) {
  return state.merge(newState)
}

export default function site(state, action) {
  if (state == undefined) {
    state = fromJS( { name: "Unknown" } );
  }

  console.log("In with action " + action.type);
  switch (action.type) {

    case SET_SITE_STATE:
      return setState(state, action.state);

    case GOTO_PAGE:
      return state.currentPage = action.pageId;

    default:
      return state;
    }
}
