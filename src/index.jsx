import React from 'react';
import ReactDOM from 'react-dom';
import immutable from 'immutable';
import {createStore, applyMiddleware} from 'redux';
import Provider from 'react-redux';
import {setState} from './action_creators';
import reducer from './reducer.js';

import {SiteContainer} from './components/Site';

var loadCBEClient = function(site, target="app") {
  const props = immutable.fromJS(site);
  const store = createStore(reducer);

  // ReactDOM.render(
  //   <Site />, document.getElementById(target)
  //   );
  ReactDOM.render(
    <Provider store={store}>
      <SiteContainer />
    </Provider>,
    document.getElementById(target)
  );
}

export {
  loadCBEClient,
};

/*
 * This is used in ../lib/index.html to immediately trigger site  loading for dev/testing purposes.
 */
if (CbeClientImmediateLoad) loadCBEClient(CBEVars.site[0], "app");