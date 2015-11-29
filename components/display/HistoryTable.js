import React, { Component, PropTypes } from 'react';
import cache from '../../data/ArtifactCache';
import DatasetUtilities from '../../data/DatasetUtilities';
import Sparkline from 'react-sparkline';

class HistoryTable extends Component {

  render() {
    const { data } = this.props;
    if (data == undefined || data == null) {
      return (<div>
                <h1>History Table </h1>
                <p>HistoryTable loading...</p>
              </div>)
    }
    else {
      let headers = data.get('dataHeaders').toArray(); 
      let years = data.get('dataPeriods').toArray();
      let rawData = data.get('data');
      let myId = this.props.componentId + ('childId' in this.props)?this.props.childId:"";
      let detailLevel = this.props.detailLevel;
      console.log("HistoryTable: detailLevel = " + detailLevel);
      // This will only recompute when necessary
      let rows = cache.computeArtifact( myId, 'processedData',
                                        {data: rawData, detailLevel, startPath: null},
                                        DatasetUtilities.extractHierarchy);
      let thStyle={textAlign:"right"};
      console.log("Here's the table! " + JSON.stringify(headers));
      return (
              <div>
                  <table className="table">
                      <thead>
                        <tr>
                            <th key="0">Category</th>
                            <th key="1">History<br/>{years[0]}-{years[years.length-1]}</th>
                            {headers.map(function(item, index) {
                                return <th key={index+2} style={thStyle}>{item}</th>
                            })}
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map(this.tableRow,this)}
                      </tbody>
                  </table>
              </div>
      );
    }
  }

  formatDollarAmount(x) {
        x = Math.round(x);
        let prefix = '$';
        if (x < 0.) prefix = '-$';
        x = Math.abs(x);
        let val = prefix + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        return val;
  }

  tableRow (item, index) {
    let categories = item.get('categories').toArray();
    let values     = item.get('values').toArray();
    let label = categories[0];
    var selectedLevel = this.props.detailLevel;
    if (selectedLevel > 0) {
      for (let i=1; i<=selectedLevel; ++i) {
        label += " " + String.fromCharCode(183) + " "+categories[i];
      }
    }

    let tdStyle={textAlign:"right"};
    return (
      <tr key={index}>
        <td key="0" style={{width:"35%"}}>{label}</td>
        <td>
          <Sparkline data={values} />
        </td>
        {values.map(
          function(item, index) {
            return <td key={index+1} style={tdStyle}>{this.formatDollarAmount(item)}</td>
          }, this)}
      </tr>
    );
  }
}

HistoryTable.PropTypes = {
  configuration: PropTypes.object.isRequired,
  cardsets: PropTypes.object.isRequired,
  datasets: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default HistoryTable;
