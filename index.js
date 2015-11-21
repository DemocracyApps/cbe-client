import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import configureStore from './state/configureStore';
import { setSiteState, setCardsState, setDataState } from './state/actions/SiteActions';
import { initializeSite, initializeCards } from './utilities/initializers';
import dataModelManager from './data/DataModelManager';

require("font-awesome-webpack");

console.log("RUNMODE = " + __RUNMODE__);

if (__RUNMODE__ == 'dummy') {
  require('./examples/testsite');
}

// Set up the redux store - all application state is maintained there.
const store = configureStore();

// Initialize the site configuration & data model requirements.
store.dispatch(setSiteState(initializeSite(CBEVars.site[0].site, dataModelManager)));
store.dispatch(setCardsState(initializeCards(CBEVars.site[0].cards)));
store.dispatch(setDataState(dataModelManager.getInitialModelState()));
dataModelManager.requestAllDatasets(store.dispatch);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

