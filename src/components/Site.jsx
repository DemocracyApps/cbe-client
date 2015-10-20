import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const Site = React.createClass({
  render: function() {
    //const value = JSON.stringify(this.props.siteProperties);
    return <div>Here we are finally</div>;
  }
});

function mapStateToProps(state) {
  return {
    siteProperties: state.get('properties'),
    pages: state.get('pages'),
    cards: state.get('cards')
  }
}
export const SiteContainer = connect(mapStateToProps)(Site);



