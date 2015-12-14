import React, { Component, PropTypes } from 'react';
import cache from '../../../data/ArtifactCache';
import ModelTransforms from '../../../data/ModelTransforms';
import ToggleButtonSet from '../ToggleButtonSet';
import ChangesTable from './ChangesTable';
import ChangesChart from './ChangesChart';

class WhatsNewPage extends Component {

    render() {
        const { datasets, componentId, configuration, componentState, actions } = this.props;
        let spending = datasets.get('spending');
        let revenue  = datasets.get('revenue');

        let ready = true;
        if ((spending != null && spending.get('value') == null) ||
            (revenue  != null && revenue.get('value')  == null) ||
            (spending == null && revenue == null)) ready = false;

        if (ready) {
            let data = spending;
            let accountType = "Expenses";
            if (spending == null || componentState.get('accountType').get("value") == "Revenue") {
                data = revenue;
                accountType = "Revenue";
            }
            let myId = this.props.componentId + ('childId' in this.props)?this.props.childId:"";
            let detailLevel = componentState.get('detailLevel').get('value');
            let rows = cache.computeArtifact( myId, 'processedData', data.get('value').get('data'),
                                            [{transform: ModelTransforms.rollupHierarchy, args: {detailLevel}},
                                             {transform: ModelTransforms.differences, args: {useInfinity: false}}]);
            let mainComponent = null;
            if (componentState.get('displayMode').get('value') == 'Chart') {
                let width = 1200, height = 600;
                if (this.props.site.maxWidth) {
                    width = Number(this.props.site.maxWidth);
                    height = Math.trunc(height*width/1200);
                }
                mainComponent = (<ChangesChart rows={rows} dataset={data.get('value')}
                                               detailLevel = {componentState.get('detailLevel').get('value')}
                                               selectedArea = {componentState.get('selectedArea').get('value')}
                                               componentId={componentId} childId="-1"/>);
            }
            else { // Table
                mainComponent = (<ChangesTable  rows={rows} dataset={data.get('value')} 
                                                detailLevel={componentState.get('detailLevel').get('value')}
                                                componentId={componentId} childId="-1"/>);
            }
            return (
                <div>
                    {this.optionsPanel(componentId, configuration, componentState, actions,
                                       data, spending != null, revenue != null)}
                    {mainComponent}
                </div>
            );
        }
        else {
            return (<div> <p>Page is loading ...</p> </div>);
        }
    }

    optionsPanel(componentId, configuration, componentState, actions, data, haveSpending, haveRevenue) {
        let selectorList = null, selectorTitle = null;
        let accountTypes = this.accountTypesSpec(componentId, componentState, 
                                                 actions, haveSpending, haveRevenue);
        let displayModes = this.displayModesSpec(componentId, componentState, actions);

        // Build the category selector
        selectorTitle = 'Detail Level';
        selectorList = this.categorySelectorSpec(componentId, componentState, actions, data);

        return (
            <div>
                <hr style={{marginTop:10, marginBottom:10}}/>
                <div className="row ">
                    {(accountTypes.length > 1)?(<ToggleButtonSet title='Account Type' columns="3" options={accountTypes}/>):""}
                    {(displayModes.length > 1)?(<ToggleButtonSet title='Display' columns="3" options={displayModes}/>):""}
                    <ToggleButtonSet title={selectorTitle} columns="6" options={selectorList}/>
                </div>
                <hr style={{marginTop:10, marginBottom:10}}/>
            </div>
        );
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

WhatsNewPage.PropTypes = {
    componentId: PropTypes.string.isRequired,
    configuration: PropTypes.object.isRequired,
    componentState: PropTypes.object.isRequired,
    datasets: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

export default WhatsNewPage;
