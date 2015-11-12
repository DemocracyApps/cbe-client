import React, { Component, PropTypes } from 'react';

class HistoryTable extends Component {

  shouldComponentUpdate (nextProps, nextState) {
    let result = (nextProps.cardsets !== this.props.cardsets ||
                  nextProps.dataModels !== this.props.dataModels);
    return result;
  }

  render() {
    let configuration = this.props.configuration;
    let dataset = this.props.dataModels.get('mydataset').get('value');
    if (dataset == undefined || dataset == null) {
      return (<div>
                <h1>History Table </h1>
                <p>HistoryTable loading...</p>
              </div>)
    }
    else {
      return (
        <div className="row">
          <h1>History Table </h1>
          <p>Still building this thing</p>
        </div>
      );
    }
  }
}

HistoryTable.PropTypes = {
  configuration: PropTypes.object.isRequired,
  cardsets: PropTypes.object.isRequired,
  datasets: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default HistoryTable;
