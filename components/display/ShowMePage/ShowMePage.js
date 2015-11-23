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

  yearSelectorSpec (componentId, configuration, componentState, actions, data) {
    let years = data.get('value').get('dataPeriods').toArray();
    console.log("In yearSelectorSpec: " + JSON.stringify(years));
    let activeIndex = (configuration.get('startYear')==0)?0:years.length-1;
    if (componentState.get('year').get('value') != null) {
      activeIndex = years.indexOf(componentState.get('year').get('value'));
      console.log("Setting activeIndex to " + activeIndex);
    }

    let yearOptions = [];
    data.get('value').get('dataPeriods').forEach( (year, index) => {
      let active = false;
      if (index == activeIndex) active = true
      yearOptions.push(this.buttonSpec("" + year,
                        {componentId, variableName: 'year', value: year},
                        active, actions));
    });
    return yearOptions;
  }
  
  categorySelectorSpec (componentId, componentState, actions, data) {
    let categories = data.get('value').get('categoryHeaders').toArray();
    console.log("In categorySelectorSpec: " + JSON.stringify(categories));
  }

  render() {
    const { datasets, componentId, configuration, componentState, actions } = this.props;
    let spending = datasets.get('spending');
    let revenue  = datasets.get('revenue');
    let accountTypes = this.accountTypesSpec(componentId, componentState, 
                                             actions, spending != null, revenue != null);
    let displayModes = this.displayModesSpec(componentId, componentState, actions);

    let ready = true;
    if ((spending != null && spending.get('value') == null) ||
        (revenue  != null && revenue.get('value')  == null) ||
        (accountTypes.length == 0)) ready = false;

    if (ready) {
      let data = (spending == null)?revenue:spending;
      if (componentState.get('accountType').get("value") == "Revenue") data = revenue;
      let typeButtons = (accountTypes.length > 1)?(<ToggleButtonSet columns="3" options={accountTypes}/>):"";
      let modeButtons = (displayModes.length > 1)?(<ToggleButtonSet columns="3" options={displayModes}/>):"";
      let selectorList = null;
      if (componentState.get('displayMode').get('value') == 'Chart') {
        // Build the year selector
        selectorList = this.yearSelectorSpec(componentId, configuration, componentState, actions, data);
      }
      else { // Table
        // Build the category selector
        selectorList = this.categorySelectorSpec(componentId, configuration, componentState, actions, data);
      }
      return (
        <div>
          <div>
            {typeButtons}
            {modeButtons}
            <ToggleButtonSet columns="4" options={selectorList}/>
          </div>
        </div>
      );
    }
    else {
      return (<div> <p>Page is loading ...</p> </div>);
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
