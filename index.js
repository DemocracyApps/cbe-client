import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './state/configureStore';
import { setSiteState } from './state/actions/siteActions';
import { initializeSite } from './utilities/initializers';

console.log("RUNMODE = " + __RUNMODE__);

if (__RUNMODE__ == 'dummy') {
  require('./examples/testsite');
}

// Set up the redux store - all application state is maintained there.
const store = configureStore();

// Initialize the site configuration
store.dispatch(setSiteState(initializeSite(CBEVars.site[0])));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

