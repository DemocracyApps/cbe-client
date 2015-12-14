import React, { Component, PropTypes } from 'react';
import cache from '../../../data/ArtifactCache';
import ModelTransforms from '../../../data/ModelTransforms';
import Sparkline from 'react-sparkline';
import FormattingUtilities from '../utilities/FormattingUtilities';

class ChangesTable extends Component {

    render() {
        const { dataset } = this.props;
        let rows = this.props.rows.toJS();
        if (dataset == undefined || dataset == null) {
          return (<div>
                    <p>ChangesTable loading...</p>
                  </div>)
        }
        else {
          let headers = dataset.get('dataHeaders').toArray(); 
          let years = dataset.get('dataPeriods').toArray();
          let thStyle={textAlign:"right"};
          rows = rows.sort(this.sortByAbsoluteDifference)
          return (
                  <div>
                      <table className="table">
                          <thead>
                            <tr>
                                <th key="0">Category</th>
                                <th key="1">History<br/>{years[0]}-{years[years.length-1]}</th>
                                <th key="2" style={thStyle}>{headers[years.size-2]}</th>
                                <th key="3" style={thStyle}>{headers[years.size-1]}</th>
                                <th key="4" style={thStyle}>Percentage<br/>Change</th>
                                <th key="5" style={thStyle}>Actual<br/>Difference</th>
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

    sortByAbsoluteDifference(item1, item2) {
        let len = item1.differences.length;
        var result = Math.abs(item2.differences[len-1]) - Math.abs(item1.differences[len-1]);
        return result;
    }

    tableRow(item, index) {
        let length = item.values.length;
        let label = this.createLabel(item);

        let tdStyle={textAlign:"right"};
        return <tr key={index}>
            <td key="0" style={{width:"35%"}}>{label}</td>
            <td>
                <Sparkline data={item.values} />
            </td>
            <td key="1" style={tdStyle}>{FormattingUtilities.formatDollarAmount(item.values[length-2])}</td>
            <td key="2" style={tdStyle}>{FormattingUtilities.formatDollarAmount(item.values[length-1])}</td>
            <td key="3" style={tdStyle}>{item.percents[item.percents.length-1]}</td>
            <td key="4" style={tdStyle}>{FormattingUtilities.formatDollarAmount(item.differences[item.differences.length-1])}</td>
        </tr>
    }

    createLabel (item) {
        var label = "";
        /*
         A. If the table is sorted by a value (the What's New table):
             1. if the detail level is Department, show as <Department> (<Service Area or Fund>)
             2. if the detail level is Division, show as <Division> (<Service Area> . <Department>)
             3. if the detail level is Account, show as <Division>.<Account> (<Service Area> . <Department)
         B. If the table is sorted by category (the Show Me The Money table),
            show as a hierarchy (for now using indentation - I'll add dynamic hierarchy as a separate issue).
         */
        if (this.props.detailLevel < 3) {
            label = item.categories[this.props.detailLevel];
            if (this.props.detailLevel == 1) {
                label += " (" + item.categories[0] + ")";
            }
            else if (this.props.detailLevel > 0) {
                label += " (" + item.categories[0] + String.fromCharCode(183) + item.categories[1] + ")";
            }
        }
        else {
            label = item.categories[2] + String.fromCharCode(183) + item.categories[3];
            label += " (" + item.categories[0] + String.fromCharCode(183) + item.categories[1] + ")";
        }
        return label;
    }
}

ChangesTable.PropTypes = {
  configuration: PropTypes.object.isRequired,
  datasets: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default ChangesTable;
