import React, { Component, PropTypes } from 'react';

class BootstrapLayout extends Component {

  renderComponent (widget, index) {
    var comp = widget.get('widgetClass');
    return React.createElement(comp, {
        key: index,
        cards: widget.get('cards'),
        datasets: widget.get('datasets'),
        properties: widget.get('properties')
    });
  }


  buildColumn (column, index) {
    var clist = column.get('widgets').toArray();
    let className = column.get('class') + " component-div"
    return (
            <div id={column.id} key={index} className={className} style={column.get('style')}>
                {clist.map(this.renderComponent)}
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

export default BootstrapLayout;
