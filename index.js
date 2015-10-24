import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './state/configureStore';
import { setSiteState, setCardsState } from './state/actions/siteActions';
import { initializeSite, initializeCards } from './utilities/initializers';
import 'bootstrap/dist/css/bootstrap.min.css';

console.log("RUNMODE = " + __RUNMODE__);

if (__RUNMODE__ == 'dummy') {
  require('./examples/testsite');
}

// Set up the redux store - all application state is maintained there.
const store = configureStore();

// Initialize the site configuration
store.dispatch(setSiteState(initializeSite(CBEVars.site[0].site)));
store.dispatch(setCardsState(initializeCards(CBEVars.site[0].cards)));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

