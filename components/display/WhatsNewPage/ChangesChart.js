import React, { Component, PropTypes } from 'react';
import cache from '../../../data/ArtifactCache';
import ModelTransforms from '../../../data/ModelTransforms';
import Sparkline from 'react-sparkline';

class ChangesChart extends Component {
    render() {
        return (<p>Hello</p>);
    }
}

ChangesChart.PropTypes = {
  configuration: PropTypes.object.isRequired,
  datasets: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default ChangesChart;
