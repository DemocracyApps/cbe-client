import React, { Component, PropTypes } from 'react';
import Page from './layout/Page';
import SiteNavigation from './layout/SiteNavigation';

/*
 * The Site component has two roles:
 *  - It is the parent component of the main elements of the application: header, page and footer.
 *  - It is responsible for issuing any requests for cards or datasets
 */
class Site extends Component {

  render() {
    const site = this.props.site;
    const cards = this.props.cards;
    const cardsets = this.props.componentCardsets;
    const dataModels = this.props.models;
    let currentPage = site.get("currentPage");
    console.log("The current page is now " + currentPage);
    let page = site.get("pages").get(currentPage);
    let styles = {};
    if (this.props.site.maxWidth) {
      styles = {maxWidth:this.props.site.maxWidth};
    }
    return (
      <div className="container" style={styles}>
        <SiteNavigation site={site} actions={this.props.actions}/>
        <Page site={site} title={page.get('title')} description={page.get('description')} layout={page.get('layout')} 
              components={site.get('components')} cardsets={cardsets} dataModels={dataModels}
              actions={this.props.actions}/>
      </div>
    );
  }
}

Site.propTypes = {
  site: PropTypes.object.isRequired,
};

export default Site;
