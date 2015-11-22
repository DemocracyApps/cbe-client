import React, { Component, PropTypes } from 'react';

class ToggleButtonSet extends Component {

  onButtonClicked(action, value) {
    action(value);
  }

  createButton (item, index) {
    var callback;
    if (item.action != undefined) {
      callback = this.onButtonClicked.bind(this, item.action, item.actionValue);
    }
    else {
      callback = function noop(){};
    }

    var className = "btn btn-default"
    if (item.active === undefined) {
      className += " disabled";
    } else if (item.active) {
      className += " btn-primary active";
    }
    return (<button key={item.name} className={className} onClick={callback}>{item.name}</button>);
  }

  render() {
    let buttons = this.props.options.map(this.createButton, this);
    return (
      <div className={"col-xs-"+this.props.columns}>
        <div className="small"><strong>{this.props.title}:</strong></div>
        <div className="btn-group" role="group" aria-label={this.props.title}>
          {buttons}
        </div>
      </div>
    );
  }
}

ToggleButtonSet.defaultProps = {
  columns: 4,
  title: "Account Type"
}

export default ToggleButtonSet;