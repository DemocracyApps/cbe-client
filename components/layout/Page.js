import React, { Component, PropTypes } from 'react';
import BootstrapLayout from './BootstrapLayout';

class Page extends Component {

  pageDescription (description) {
    if (description != null) {
      return <div><p>{description}</p><hr/></div>
    }
  }

  render () {
    const { title, description, layout, components, actions } = this.props;
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
                <h1>{title}</h1>
                {this.pageDescription(description)}
            </div>
          </div>
        </div>
        <div className="container-fluid site-body">
          <BootstrapLayout layout={layout} components={components} cardsets={this.props.cardsets}
                           dataModels={this.props.dataModels} actions={this.props.actions}/>
        </div>
      </div>
    );
  }

}

Page.PropTypes = {
  title:      PropTypes.string.isRequired,
  description: PropTypes.string,
  layout:     PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  cardsets:   PropTypes.object.isRequired,
  datasets:   PropTypes.object.isRequired
};
export default Page;
