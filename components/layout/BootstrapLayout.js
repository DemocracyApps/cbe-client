import React, { Component, PropTypes } from 'react';

class BootstrapLayout extends Component {

  renderComponent (componentId, index) {
    var component = this.props.components.get(componentId);
    var cardsets  = this.props.cardsets.get(componentId+"");
//    var datasets  = this.props.datasets.get(componentId);
    var datasets = null;
    var comp = component.get('componentClass');
    return React.createElement(comp, {
        key: index,
        configuration: component.get('properties'),
        cardsets: cardsets,
        datasets: datasets,
        actions: null
    });
  }


  buildColumn (column, index) {
    var clist = column.get('components').toArray();
    let className = column.get('class') + " component-div"
    return (
            <div id={column.id} key={index} className={className} style={column.get('style')}>
                {clist.map(this.renderComponent, this)}
            </div>
    );
  }

  buildRow (row, index) {
    return (
      <div key={"row_" + index} className="row">
          { row.get('columns').map(this.buildColumn, this) }
      </div>
    );
  }

  render() {
    const layout = this.props.layout;
    if (layout == null) {
      return <div key="bootstrapLayout" >Nothing</div>
    }
    else {
      return (
        <div key="bootstrapLayout">
            {layout.get('rows').map(this.buildRow, this)}
        </div>
      );
    }
  }
};

BootstrapLayout.PropTypes = {
  layout:     PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  cardsets:   PropTypes.object.isRequired,
  datasets:   PropTypes.object.isRequired
};

export default BootstrapLayout;
