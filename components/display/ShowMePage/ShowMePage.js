import React, { Component, PropTypes } from 'react';
//import OptionsPanel from './OptionsPanel';
import ToggleButtonSet from '../ToggleButtonSet';
import HistoryTable from '../HistoryTable';

class ShowMePage extends Component {

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
      //data.get('func')('USA!');
      if (componentState.get('accountType').get("value") == "Revenue") data = revenue;
      let selectorList = null, selectorTitle = null;
      let mainComponent = "";
      if (componentState.get('displayMode').get('value') == 'Chart') {
        // Build the year selector
        selectorTitle = 'Year';
        selectorList = this.yearSelectorSpec(componentId, configuration, componentState, actions, data);
        mainComponent = (<HistoryTable data={data.get('value')} componentId={componentId} childId="-0"/>);
      }
      else { // Table
        // Build the category selector
        selectorTitle = 'Detail Level';
        selectorList = this.categorySelectorSpec(componentId, componentState, actions, data);
        mainComponent = (<HistoryTable data={data.get('value')} 
                                       detailLevel={componentState.get('detailLevel').get('value')}
                                       componentId={componentId} childId="-1"/>);
      }

      return (
        <div>
          <div>
            {(accountTypes.length > 1)?(<ToggleButtonSet title='Account Type' columns="3" options={accountTypes}/>):""}
            {(displayModes.length > 1)?(<ToggleButtonSet title='Display' columns="3" options={displayModes}/>):""}
            <ToggleButtonSet title={selectorTitle} columns="6" options={selectorList}/>
          </div>
          {mainComponent}
        </div>
      );
    }
    else {
      return (<div> <p>Page is loading ...</p> </div>);
    }
  }

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
    let activeIndex = (configuration.get('startYear')==0)?0:years.length-1;
    if (componentState.get('year').get('value') != null) {
      activeIndex = years.indexOf(componentState.get('year').get('value'));
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
    let activeIndex = componentState.get('detailLevel').get('value');

    let categoryOptions = [];
    data.get('value').get('categoryHeaders').forEach( (category, index) => {
      let active = false;
      if (index == activeIndex) active = true
      categoryOptions.push(this.buttonSpec("" + category,
                        {componentId, variableName: 'detailLevel', value: index},
                        active, actions));
    });
    return categoryOptions;
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
