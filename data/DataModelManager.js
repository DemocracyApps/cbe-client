import { fromJS } from 'immutable';
import { fetchDatasets } from '../state/actions/SiteActions';

class DataModelManager {

  constructor () {
    this.dataModels     = [];
    this.dmDependencies = {};
  } 

  registerDataModel (type, key, dsIds) {
    let id = this.dataModels.length;
    this.dataModels.push({
      type,
      id,
      datasets: dsIds,
      value: null,
      artifacts: {}
    });
    dsIds.forEach( (dsId) => {
      if (!(dsId in this.dmDependencies)) this.dmDependencies[dsId] = [];
      this.dmDependencies[dsId].push(id);
    });
    return id;
  }

  getDependentModels (id) {
    return (id in this.dmDependencies)?this.dmDependencies[id]:null;
  }

  updateModel(model, dsId, datasets) {
    let ready = model.get('datasets').reduce (function (accum, current) {
      console.log("Here is current: " + current);
//      let ds = datasets.get(current + "");
      return accum && (datasets.get(current+"").get('data') !== null);
    }, true);
    console.log("UpdateModel for dsID " + dsId + " yields " + ready);
    if (ready) {
      let datasetList = [];
      console.log("datasets = " + JSON.stringify(datasets));
      model.get('datasets').forEach( (ds) => { 
        console.log("Extracting " + ds);
        let d = datasets.get(ds+"").get('data');
        console.log("Resulting d = " + JSON.stringify(d.get('year')));
        datasetList.push(d); 
      });
      datasetList.sort( (ds1, ds2) => {
        return (ds1.get('year')+0) - (ds2.get('year') + 0);
      });
      datasetList.forEach ( (ds) => {console.log("Now order " + ds.get('year'))});
    }
    return model;
  }

  requestAllDatasets (dispatch) {
    let requestIds = [];
    for (let id in this.dmDependencies) {
      requestIds.push(id);
      console.log("Adding to requestIds: " + id);
    }
    fetchDatasets(requestIds, dispatch);
  }

  getInitialModelState () {
    console.log("Initial model state: " + JSON.stringify(this.dataModels));
    return fromJS(this.dataModels);
  }

}

export default new DataModelManager(); // Singleton
