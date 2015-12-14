import React, { Component, PropTypes } from 'react';
import d3 from 'd3';
var d3BarChart = require('./D3BarChart');

class VerticalBarChart extends Component {

    componentDidMount() {
        var el = React.findDOMNode(this.refs.myChart);
        $(el).children().remove();
        d3BarChart.create(el, {width: this.props.width, height: this.props.height}, this.props.data);
    }

    componentDidUpdate() {
        var el = React.findDOMNode(this.refs.myChart);
        $(el).children().remove();
        d3BarChart.create(el, {width: this.props.width, height: this.props.height}, this.props.data);
    }

    componentWillUnmount () {
        $(".bar-tooltip").remove();
    }
    
    render() {
        return (
            <div>
                <div className="Chart" ref="myChart"></div>
            </div>
        )

    }
}

VerticalBarChart.PropTypes= {
    data: React.PropTypes.array.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
};

export default VerticalBarChart;