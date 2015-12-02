import React, { Component, PropTypes } from 'react';

class BootstrapLayout extends Component {

  renderComponent (componentId, index) {
    var component = this.props.components.get(componentId);
    var cardsets  = this.props.cardsets.get(componentId+"");
    var comp = component.get('componentClass');
    var myModels = component.get('models').map( (modelId) => {
      return this.props.dataModels.get(modelId);
    });
    return React.createElement(comp, {
        key: index,
        componentId,
        site: this.props.site,
        configuration: component.get('properties'),
        cardsets: cardsets,
        datasets: myModels,
        componentState: component.get('state'),
        actions: this.props.actions
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
      <div key={"row_" + index} className="row" style={{margin:0}}>
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
