import React, { Component, PropTypes } from 'react';
import VerticalBarChart from './VerticalBarChart';

class ChangesChart extends Component {
    render() {
        const { selectedArea, detailLevel } = this.props;
        let rows = this.props.rows;
        let areas = this.getTopLevelCategories(rows);
        // Pull out only those in the selected area
        if (areas != null && selectedArea >= 0) {
            let selectedName = areas[selectedArea].name;
            rows = rows.filter((row) => {return (row.get('categories').get(0) == selectedName);});
        }
        let topDifferences = this.computeTopDifferences(rows, detailLevel);
        let w = Math.max(300,2* (100 * Math.trunc(window.innerWidth/100))/3);
        let title = (this.props.accountType=="Spending")?'Top Spending Changes':'Top Revenue Changes';
        return (
            <div className = "row">
                <div className="col-md-3 col-sm-3">
                    {this.areaSelector(areas, selectedArea)}
                </div>
                <div className="col-md-9 col-sm-9">
                    <h2>{title}</h2>
                    <VerticalBarChart width={w} height={600} data={topDifferences}/>
                </div>
            </div>
        )
    }

    computeTopDifferences (startRows, detailLevel) {
        let rows = startRows.sort(this.sortByAbsoluteDifference).take(10);
        let topDifferences = [];
        rows.forEach((row) => {
            let diffs = row.get('differences');
            let percents = row.get('percents');
            let item = {
                show: true,
                name: row.get('categories').get(detailLevel),
                categories: row.get('categories').take(detailLevel+1).toArray(),
                value: diffs.get(diffs.size-1),
                percent: percents.get(percents.size-1),
                history: row.get('values').toArray()
            };
            topDifferences.push(item);
        });
        if (rows.size < 10) {
            for (let i=0; i<10-rows.size; ++i) {
                topDifferences.push({
                    show: false,
                    name: "Filler " + i,
                    categories: ["Filler " + i],
                    value: 0.0
                });
            }
        }
        return topDifferences;
    }

    areaSelector(areas, selectedArea) {
        return (<div>
            <h2>Service Area</h2>
            <br/>
            <ul className="servicearea-selector nav nav-pills nav-stacked">
                <li role="presentation" className={selectedArea==-1?"active":"not-active"}>
                    <a href="#" id={-1} onClick={this.selectArea.bind(null,
                                          {action:this.props.actions.setComponentState,
                                           value: {componentId: this.props.componentId, variableName:'selectedArea', value:-1}}
                                        )}>All Areas</a>
                </li>
                {areas.map(function(item, index){
                    let spacer = String.fromCharCode(160);
                    return (
                        <li role="presentation" className={selectedArea==index?"active":"not-active"}>
                            <a href="#" id={index}
                               onClick={this.selectArea.bind(null,
                                {action:this.props.actions.setComponentState,
                                 value:{componentId: this.props.componentId, variableName:'selectedArea', value:index}}
                                )}>{spacer} {item.name}</a>
                        </li>
                    )
                }.bind(this))}
            </ul>
        </div>
        );
    }

    selectArea (action) {
        action.action(action.value);
    }

    getTopLevelCategories(rows) {
        let areaHash = {};
        let nYears = rows.get(0).get('values').size;
        rows.forEach((row) => {
            let topCategory = row.get('categories').get(0);
            if (!(topCategory in areaHash)) {
                let area = {
                    name: topCategory,
                    value: 0.0
                };
                area.value+= Number(row.get('values').get(nYears-1));
                areaHash[topCategory] = area;
            }
        });
        let areas = [];
        for (let nm in areaHash) {
            if (areaHash.hasOwnProperty(nm) && Math.abs(areaHash[nm].value) > 0.0) {
                areas.push(areaHash[nm]);
            }
        }
        areas = areas.sort((a,b)=>{return b.value - a.value});
        return areas;
    }
}

ChangesChart.PropTypes = {
  configuration: PropTypes.object.isRequired,
  datasets: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default ChangesChart;
