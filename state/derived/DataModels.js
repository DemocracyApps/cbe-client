import { fromJS } from 'immutable';
import { requestDatasets, fetchDatasets } from '../actions/SiteActions';

var DataModels = {
  pendingDatasets: null,
  componentDatasets: null,

  // We'll request all the datasets being used, but also set up 
  // the structures we'll need to merge them for use by components.
  requestAllDatasets: function (components, dispatch) {
    this.pendingDatasets = {};
    this.componentDatasets = {};
    components.forEach((item, index) => {
      let datasets = {}; // Dataset sets used by this component, keyed by tag
      item.get('datasets').forEach((set, key) => {
        let ids = [];
        set.get('ids').forEach( (id) => {
          ids.push(id);
          if (id in this.pendingDatasets) {
            this.pendingDatasets[id].push(item.get(id));
          }
          else {
            this.pendingDatasets[id] = [item.get(id)];
          }
        });
        datasets[key] = {
          ids: ids,
          remaining: ids.length
        };
      });
      this.componentDatasets[item.get('id')] = datasets;
    });
    let requestIds = [];
    for (let id in this.pendingDatasets) {
      requestIds.push(id);
    }
    fetchDatasets(requestIds, dispatch);
  },

  updateComponentDatasets: function (components, cards) {
    if (this.componentDatasets == null) {
      this.initialize(components, cards);
      this.componentDatasets = fromJS(this.rawCardsets);
    }
    else {
      // There's not actually anything to do here right now since cards don't get loaded asynchronously.
    }
    return this.componentDatasets;
  }
};

export default DataModels;