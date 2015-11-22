import React, { Component, PropTypes } from 'react';
import ToggleButtonSet from '../ToggleButtonSet';
class OptionsPanel extends Component {
  render() {
    let types = this.props.accountTypes;
    let typeButtons = (types.length > 1)?(<ToggleButtonSet columns="6" options={types}/>):(<p>No buttons</p>);
    return (
      <div >
        {typeButtons}
        <p>I am the options panel</p>
      </div>
    );
  }
}

export default OptionsPanel;