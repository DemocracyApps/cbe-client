import {apiFetchDatasets} from './ApiActions';

export const GOTO_PAGE      = 'GOTO_PAGE';
export const SET_SITE_STATE = 'SET_SITE_STATE';
export const SET_CARDS_STATE = 'SET_CARDS_STATE';
export const REQUEST_DATASETS = 'REQUEST_DATASETS';
export const RECEIVE_DATASETS = 'RECEIVE_DATASETS';

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

export function receiveDatasets (datasets) {
  return {
    type: RECEIVE_DATASETS,
    datasets
  };
}

export function requestDatasets (datasetIds) {
  return {
    type: REQUEST_DATASETS,
    datasetIds
  };
}

function showit() {
  alert("Hi there!");
  return {
    type: RECEIVE_DATASETS,
    datasetIds: []
  };
}

export function fetchDatasets(datasetIds, dispatch) {
  let url = CBEVars.site[0].server.apiUrl + "/datasets/" + datasetIds.join();
  console.log("The server API url is " + url);
  //return dispatch => {
    dispatch(requestDatasets(datasetIds));
    return  fetch(url)
            .then(response => response.json())
            .then(json     => dispatch(receiveDatasets(json)));
  //};
  
  // console.log("In fetchDatasets: " + JSON.stringify(datasetIds));
  // dispatch(requestDatasets(datasetIds));
  // dispatch ( (dispatch) => {
  //   console.log("Inner1");
  //   setTimeout(() => {
  //     console.log("Inner2");
  //     dispatch(showit());
  //   }, 3000);
  // });

    // return fetch(`http://www.reddit.com/r/${reddit}.json`)
    //   .then(response => response.json())
    //   .then(json => dispatch(receivePosts(reddit, json)));
}

export function gotoPage(pageId) {
  return {
    type: GOTO_PAGE,
    pageId
  };
}

