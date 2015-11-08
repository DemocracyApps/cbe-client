import { RECEIVE_DATASET, REQUEST_DATASETS, SET_DATA_STATE } from '../actions/SiteActions';
import { fromJS } from 'immutable';
import dataModelManager from '../../data/DataModelManager';

function setState (state, newState) {
  return state.merge(newState);
}

export default function data(state, action) {
  if (state == undefined) {
    console.log("DATA STATE IS UNDEFINED with action type " + action.type);
    state = fromJS( { datasets: {}, models: [] });
  }

  console.log("In with data action " + action.type);
  switch (action.type) {

    case SET_DATA_STATE:
      state = state.set('models', action.models);
      return state;

    case REQUEST_DATASETS:
      action.datasetIds.map( (id) => {
        state = state.setIn(['datasets', id], fromJS({id: id, data: null}));
      });
      console.log("After requests: " + JSON.stringify(state));
      return state;
      
    case RECEIVE_DATASET:
      state = state.setIn(['datasets', action.dataset.id+"", 'data'], fromJS(action.dataset));
      state = state.setIn(['models'], state.get('models').map( (model) => {
        return dataModelManager.updateModel(model, action.dataset.id+"", state.get('datasets'));
      }));
      return state;

    default:
      return state;
    }
}
