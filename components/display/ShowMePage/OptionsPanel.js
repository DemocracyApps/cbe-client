import React, { Component, PropTypes } from 'react';
import ToggleButtonSet from '../ToggleButtonSet';
class OptionsPanel extends Component {
  render() {
    let types = this.props.accountTypes;
    let displayModes = this.props.displayModes;
    let typeButtons = (types.length > 1)?(<ToggleButtonSet columns="3" options={types}/>):"";
    let modeButtons = (displayModes.length > 1)?(<ToggleButtonSet columns="3" options={displayModes}/>):"";
    return (
      <div >
        {typeButtons}
        {modeButtons}
        <p>I am the options panel</p>
      </div>
    );
  }
}

export default OptionsPanel;