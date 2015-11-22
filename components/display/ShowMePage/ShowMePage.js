import React, { Component, PropTypes } from 'react';
//import OptionsPanel from './OptionsPanel';
import ToggleButtonSet from '../ToggleButtonSet';

class ShowMePage extends Component {

  buttonSpec (name, actionValue, active, actions) {
    return {
      name,
      action: actions.setComponentState,
      actionValue,
      active
    };
  }

  accountTypesSpec (componentId, componentState, actions, doSpending, doRevenue) {
    let accountTypes = [];
    if (doSpending) {
      accountTypes.push(this.buttonSpec("Spending",
                          {componentId, variableName:'accountType', value:'Spending'},
                          (componentState.get('accountType').get("value") == "Spending"),
                          actions));
    }
    if (doRevenue) {
      accountTypes.push(this.buttonSpec("Revenue",
                          {componentId, variableName:'accountType', value:'Revenue'},
                          (componentState.get('accountType').get("value") == "Revenue"),
                          actions));
    }
    return accountTypes;
  }

  displayModesSpec (componentId, componentState, actions) {

    // Set up the display modes
    let displayModes = [];
    displayModes.push(this.buttonSpec("Chart",
                        {componentId, variableName: 'displayMode', value: "Chart"},
                        (componentState.get('displayMode').get("value") == "Chart"),
                        actions));
    displayModes.push(this.buttonSpec("Table",
                        {componentId, variableName: 'displayMode', value: "Table"},
                        (componentState.get('displayMode').get("value") == "Table"),
                        actions));
    return displayModes;
  }

  render() {
    let spending = this.props.datasets.get('spending');
    let revenue = this.props.datasets.get('revenue');
    let accountTypes = this.accountTypesSpec(this.props.componentId, this.props.componentState, 
                                             this.props.actions, spending != null, revenue != null);
    let displayModes = this.displayModesSpec(this.props.componentId, this.props.componentState, this.props.actions);

    let ready = true;
    if ((spending != null && spending.get('value') == null) ||
        (revenue  != null && revenue.get('value')  == null) ||
        (accountTypes.length == 0)) ready = false;

    let typeButtons = (accountTypes.length > 1)?(<ToggleButtonSet columns="3" options={accountTypes}/>):"";
    let modeButtons = (displayModes.length > 1)?(<ToggleButtonSet columns="3" options={displayModes}/>):"";

    if (ready) {
      return (
        <div>
          <div>
            {typeButtons}
            {modeButtons}
            <p>I am the options panel </p>
          </div>
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
