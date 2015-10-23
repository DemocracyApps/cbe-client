import React, { Component, PropTypes } from 'react';
import BootstrapLayout from './BootstrapLayout';

class Page extends Component {

  pageDescription (description) {
    if (description != null) {
      return <div><p>{description}</p><hr/></div>
    }
  }

  render () {
    const { title, description, layout } = this.props;
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
          <BootstrapLayout layout={layout}/>
        </div>
      </div>
    );
  }

}

export default Page;
