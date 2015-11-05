import { RECEIVE_DATASETS, REQUEST_DATASETS } from '../actions/SiteActions';
import { fromJS } from 'immutable';

function setState (state, newState) {
  return state.merge(newState);
}

export default function datasets(state, action) {
  if (state == undefined) {
    state = fromJS( { datasets: {} } );
  }

  console.log("In with datasets action " + action.type);
  switch (action.type) {

    case REQUEST_DATASETS:
      console.log("Requesting datasets: " + action.datasetIds);
      return state;
      
    case RECEIVE_DATASETS:
      console.log("WOW, We received some datasets and I have no clue what to do with them!");
      return setState(state, action.state);

    default:
      return state;
    }
}
