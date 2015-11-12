import { RECEIVE_DATASET, REQUEST_DATASETS, SET_DATA_STATE } from '../actions/ActionTypes';
import { fromJS } from 'immutable';
import dataModelManager from '../../data/DataModelManager';

function setState (state, newState) {
  return state.merge(newState);
}

export default function data(state, action) {
  if (state == undefined) {
    state = fromJS( { raw: {}, models: [] });
  }

  switch (action.type) {

    case SET_DATA_STATE:
      // Initialize the data state
      state = state.set('models', action.models);
      return state;

    case REQUEST_DATASETS:
      // Just put the placeholder in for when they are received.
      action.datasetIds.map( (id) => {
        state = state.setIn(['raw', Number(id)], fromJS({id: id, data: null}));
      });
      return state;
      
    case RECEIVE_DATASET:
       // Save the dataset itself and then pass through to models for computation.
      state = state.setIn(['raw', action.dataset.id, 'data'], fromJS(action.dataset));
      state = state.setIn(['models'], state.get('models').map(
        (model) => {
          return dataModelManager.updateModel(model, action.dataset.id, state.get('raw'));
      }));
      return state;

    default:
      return state;
    }
}
