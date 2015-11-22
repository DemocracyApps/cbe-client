import React, { Component, PropTypes } from 'react';
import OptionsPanel from './OptionsPanel';

class ShowMePage extends Component {

  pageSetup (componentId, configuration, componentState, actions) {
    let spending = this.props.datasets.get('spending'), revenue = this.props.datasets.get('revenue');
    let ready = true;
    let accountTypes = [];
    if (spending != null) {
      let active = (componentState.get('accountType').get("value") == "Spending");
      accountTypes.push({
        name: "Spending",
        action: actions.setComponentState,
        actionValue: { componentId, variableName: "accountType", value: "Spending"},
        active
      });
    }
    if (revenue != null) {
      let active = (componentState.get('accountType').get("value") == "Revenue");
      accountTypes.push({
        name: "Revenue",
        action: actions.setComponentState,
        actionValue: { componentId, variableName  : "accountType", value: "Revenue"},
        active
      });
    }
    if (spending != null && spending.get('value') == null) ready = false;
    if (revenue != null && revenue.get('value') == null) ready = false;
    if (accountTypes.length < 1) ready = false;
    return {
      ready,
      accountTypes
    }
  }

  render() {
    console.log("componentState = " + JSON.stringify(this.props.componentState));
    let setup = this.pageSetup(this.props.componentId, this.props.configuration, 
                               this.props.componentState, this.props.actions);

    if (setup.ready) {
      return (
        <div>
          <OptionsPanel accountTypes={setup.accountTypes} actions={this.props.actions}/>
        </div>
      );
    }
    else {
      return (<div> I am not yet ready </div>);
    }
  }
}

ShowMePage.PropTypes = {
  configuration: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  cardsets: PropTypes.object.isRequired,
  datasets: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default ShowMePage;
