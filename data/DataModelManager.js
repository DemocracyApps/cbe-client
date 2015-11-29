import { fromJS, List, Map} from 'immutable';
import { fetchDatasets } from '../state/actions/SiteActions';

class DataModelManager {

  constructor () {
    this.dataModels     = [];
    this.dmDependencies = {};
  }

  translateCategories(categories, mapping) {
    return categories; // Stub for now.
  }

  extractFromTree (node, threshold) {
    let data = [];
    if (node.hasOwnProperty('bottom') && node.bottom) {
      var keep = false;
      for (let i = 0; !keep && i < node.values.length; ++i) {
          if (Math.abs(node.values[i]) >= threshold) keep = true;
      }
      if (keep) data.push({categories: node.categories, values: node.values});
    }
    else {
        for (var prop in node) {
            if (prop != 'bottom' && node.hasOwnProperty(prop)) {
                data = data.concat(this.extractFromTree(node[prop], threshold));
            }
        }
    }
    return data;
  }

  mergeDatasets (datasetList, mapping, threshold) {
    let nPeriods = datasetList.length;
    // A couple helper functions
    let initAmounts = function() { let a = []; for (let i=0; i<nPeriods; ++i) a.push(0.0); return a; };
    let getCategoryValue = function (level, index, taxonomy) { return taxonomy.get(level).get('values').get(index);};
    let categoryCount = -1;
    // First we merge the datasets using a tree
    let tree = {};
    for (let iPeriod = 0; iPeriod < nPeriods; ++iPeriod) {
      let ds = datasetList[iPeriod];
      let taxonomy = ds.get('taxonomy');
      // Throw each row into the tree
      ds.get('values').forEach( (row ) => {
        if (row.get('value').length > 0) {
          let treePtr = tree;
          let categories = row.get('categories').map( 
            (category, index) => { return getCategoryValue(index, category, taxonomy); }
          ).toArray();
          let translatedCategories = (mapping == null)?categories:this.translateCategories(categories, mapping);

          if (categoryCount < 0) {
            categoryCount = categories.length;
          }
          else {
            if (categories.length != categoryCount) 
              throw ("Invalid dataset " + ds.get('id') + ": all entries must have same number of categories");
          }
          for (let level = 0; level < categories.length; ++level) {
            if (!(categories[level] in treePtr)) {
              treePtr[categories[level]] = {bottom: false, values: initAmounts()};
            }
            if (level == categories.length-1) {
              treePtr[categories[level]].bottom = true;
              treePtr[categories[level]].categories = translatedCategories;
              treePtr[categories[level]].values[iPeriod] += Number(row.get('value'));
            }
            else {
              treePtr = treePtr[categories[level]];
            }
          }
        }
      });
    }

    let mergedData = this.extractFromTree(tree, threshold);
    // We'll take the category names from the first dataset
    let categoryHeaders = datasetList[0].get('taxonomy').map((catItem) => {
      return catItem.get('name');
    }).toArray();
    let dataHeaders = [];
    let dataPeriods = [];
    datasetList.forEach((ds) => {
      dataHeaders.push(ds.get('name'));
      dataPeriods.push(ds.get('year'));
    })
    return {
      categoryHeaders,
      dataHeaders,
      dataPeriods,
      data: mergedData
    };
  }

  /*
   * External API functions. Others above are auxiliary to those below
   */

  requestAllDatasets (dispatch) {
    let requestIds = [];
    for (let id in this.dmDependencies) {
      requestIds.push(id);
    }
    fetchDatasets(requestIds, dispatch);
  }

  getInitialModelState () {
    return fromJS(this.dataModels);
  }

  registerDataModel (type, key, datasetIds) {
    // Dataset IDs are integers - make sure they are converted.
    let dsIds = datasetIds.map( (dsId) => { return Number(dsId); });
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

  updateModel(model, dsId, datasets) {
    if (! model.get('datasets').includes(dsId)) { // Nothing to do if dsId isn't part of this model
      return model;
    }
    // We only compute the merge if we have all the constituent datasets for now.
    let ready = model.get('datasets').reduce (
      function (accum, dsId) {
        return accum && (datasets.get(dsId).get('data') !== null);
      }, true);
    if (ready) {
      // Sort the datasets in time and then send them into the merge function.
      let datasetList = model.get('datasets').map( (ds) => { return datasets.get(ds).get('data'); }).toArray();
      datasetList.sort( (ds1, ds2) => { return (Number(ds1.get('year')) - Number(ds2.get('year'))); });
      model = model.set('value', fromJS(this.mergeDatasets(datasetList, null, 0.0)));
//      let func = function (arg) {console.log("I got the argument " + arg);}
//      model = model.set('func', func);

            // return {
            //     //categories:this.initializationParameters.hierarchy,
            //     categories:this.hierarchy,
            //     dataHeaders:headers,
            //     periods:headers,
            //     levelsDown: startLevel,
            //     //levelsAggregated: this.initializationParameters.hierarchy.length - nLevels - startLevel,
            //     levelsAggregated: this.hierarchy.length - nLevels - startLevel,
            //     data: data
            // };
    }
    return model;
  }

}

export default new DataModelManager(); // Singleton
