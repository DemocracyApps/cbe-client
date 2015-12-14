import React, { Component, PropTypes } from 'react';
import cache from '../../../data/ArtifactCache';
import ModelTransforms from '../../../data/ModelTransforms';
import Sparkline from 'react-sparkline';

class ChangesChart extends Component {
    // <ChangesChart rows={rows} dataset={data.get('value')}
    //                            detailLevel = {componentState.get('detailLevel').get('value')
    //                            componentId={componentId} childId="-1"/>
    render() {
        let selectedArea = this.props.selectedArea;
        let areas = this.getTopLevelCategories(this.props.rows);
        let startPath = [], L0 = 1;

        if (areas != null && selectedArea >= 0) {
            startPath = [areas[selectedArea].name];
            L0 = 0;
        }

//        let curData = dm.getData({accountTypes:[acctType], startPath: startPath, nLevels: selectedLevel + L0}, false);
        let curData = null;
        if (curData == null) {
            return (
                <div style={{height: 600}}>
                    <div className="row">
                        <div className="col-xs-3"></div>
                        <div className="col-xs-9">
                            <p>Data is loading ... Please be patient</p>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            // Skip over any levels that have only a single item.
            // while (curData.data.length <= 1 && selectedLevel < 3) {
            //     ++selectedLevel;
            //     curData = dm.getData({accountTypes:[acctType], startPath: startPath, nLevels: selectedLevel + L0}, false);
            // }

            // Start by computing differences, sorting, and then slicing out the top 10.
            let topDifferences = this.computeTopDifferences(curData, selectedLevel);
            let w = Math.max(300,2* (100 * Math.trunc(window.innerWidth/100))/3);
            let txt = (this.props.accountType==AccountTypes.EXPENSE)?'Top Spending Changes':'Top Revenue Changes';
            return (
                <div className = "row">
                    <div className="col-md-3 col-sm-3">
                        <h2>Service Area</h2>
                        <br/>
                        <ul className="servicearea-selector nav nav-pills nav-stacked">
                            <li role="presentation" className={selectedArea==-1?"active":"not-active"}>
                                <a href="#" id={-1} onClick={this.selectArea}>All Areas</a>
                            </li>

                            {areas.map(function(item, index){
                                let spacer = String.fromCharCode(160);
                                return (
                                    <li role="presentation" className={selectedArea==index?"active":"not-active"}>
                                        <a href="#" id={index}
                                           onClick={this.selectArea.bind(null, index)}>{spacer} {item.name}</a>
                                    </li>
                                )
                            }.bind(this))}
                        </ul>
                    </div>
                    <div className="col-md-9 col-sm-9">
                        <h2>{txt}</h2>
                        <VerticalBarChart width={w} height={600} data={topDifferences}/>
                    </div>
                </div>
            )
        }
    }

    getTopLevelCategories(rows) {
        let areaHash = {};
        let nYears = rows.get(0).get('values').size;
        rows.forEach((row) => {
            console.log("Row: " + JSON.stringify(row));
            if (!(row['categories'] in areaHash)) {
                let area = {
                    name: row.get('categories').get(0),
                    value: 0.0
                };
                area.value+= Number(row.get('values').get(nYears-1));
                areaHash[row.get('categories').get(0)] = area;
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
