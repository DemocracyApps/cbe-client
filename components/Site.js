import React, { Component, PropTypes } from 'react';
import Page from './layout/Page';

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
    const datasets = this.props.componentDatasets;

    let currentPage = site.get("currentPage");
    let page = site.get("pages").get(currentPage);
    let styles = {};
    if (this.props.site.maxWidth) {
      styles = {maxWidth:this.props.site.maxWidth};
    }
    return (
      <div className="container" style={styles}>
        <Page title={page.get('title')} description={page.get('description')} layout={page.get('layout')} 
              components={site.get('components')} cardsets={cardsets} datasets={datasets}/>
      </div>
    );
  }
}

Site.propTypes = {
  site: PropTypes.object.isRequired,
};

export default Site;
