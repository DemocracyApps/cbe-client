import {apiFetchDatasets} from './ApiActions';

export const GOTO_PAGE      = 'GOTO_PAGE';
export const SET_SITE_STATE = 'SET_SITE_STATE';
export const SET_CARDS_STATE = 'SET_CARDS_STATE';
export const SET_DATA_STATE   = 'SET_DATA_STATE';
export const REQUEST_DATASETS = 'REQUEST_DATASETS';
export const RECEIVE_DATASET = 'RECEIVE_DATASET';

export function setSiteState (state) {
  return {
    type: SET_SITE_STATE,
    state
  };
}

export function setCardsState (state) {
  return {
    type: SET_CARDS_STATE,
    state
  };
}

export function setDataState (models) {
  return {
    type: SET_DATA_STATE,
    models
  };
}


export function receiveDataset (dataset) {
  return {
    type: RECEIVE_DATASET,
    dataset
  };
}

export function requestDatasets (datasetIds) {
  return {
    type: REQUEST_DATASETS,
    datasetIds
  };
}

export function fetchDatasets(datasetIds, dispatch) {
  let url = CBEVars.site[0].server.apiUrl + "/datasets/" + datasetIds.join();
  console.log("The server API url is " + url);
  dispatch(requestDatasets(datasetIds));
  return  fetch(url)
          .then(response => response.json())
          .then(
            (json)     => {
              for (let i=0; i<json.data.length; ++i) {
                console.log("Process " + json.data[i].id);
                dispatch(receiveDataset(json.data[i]));
              }
            }
          );
}

export function gotoPage(pageId) {
  return {
    type: GOTO_PAGE,
    pageId
  };
}

