import { SET_SITE_STATE, GOTO_PAGE, REGISTER_RECEIVED_DATASET } from '../actions/ActionTypes';
import { fromJS } from 'immutable';

function setState (state, newState) {
  return state.merge(newState)
}

function registerDataset (state, dsId) {
  console.log("Datasets required: " + JSON.stringify(state.get('requiredDatasets')));
  dsId += "";
  if (state.get('requiredDatasets').has(dsId)) {
    state.set('components', 
      state.map('components', (component) => {
        if (component.get('requiredDatasets').has(dsId)) {
          console.log("Yupper - component " + component.get("id") + " needs dataset " + dsId);
          // Flag received datasets and compute derived model if ready.
          return 
        }
        else {
          console.log("Noper - component " + component.get("id") + " does not need dataset " + dsId);
          return component;
        }
      }) // End of state.map('components')
    ); // End of state.set('components')
  }
  return state;
}

export default function site(state, action, fullState = null) {
  if (state == undefined) {
    state = fromJS( { name: "Unknown" } );
  }

  switch (action.type) {

    case SET_SITE_STATE:
      return setState(state, action.state);

    case REGISTER_RECEIVED_DATASET:
      console.log("I am processing received dataset " + action.datasetId);
      return registerDataset(state, action.datasetId);

    case GOTO_PAGE:
      console.log("I am going to page: " + action.pageId);
      return state.set('currentPage', action.pageId);

    default:
      return state;
    }
}
