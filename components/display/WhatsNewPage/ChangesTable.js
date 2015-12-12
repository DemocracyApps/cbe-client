import React, { Component, PropTypes } from 'react';
import cache from '../../../data/ArtifactCache';
import ModelTransforms from '../../../data/ModelTransforms';
import Sparkline from 'react-sparkline';

class ChangesTable extends Component {
    render() {
        return (<p>Hello</p>);
    }
}

ChangesTable.PropTypes = {
  configuration: PropTypes.object.isRequired,
  datasets: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default ChangesTable;
