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
    let page = site.get("pages").get(currentPage);
    let styles = {};
    if (this.props.site.maxWidth) {
      styles = {maxWidth:this.props.site.maxWidth};
    }
    this.pushUrl(page.get('shortName'));
    return (
      <div className="container" style={styles}>
        <SiteNavigation site={site} actions={this.props.actions}/>
        <Page site={site} title={page.get('title')} description={page.get('description')} layout={page.get('layout')} 
              components={site.get('components')} cardsets={cardsets} dataModels={dataModels}
              actions={this.props.actions}/>
      </div>
    );
  }

  pushUrl (shortName) {
      var baseUrl = this.props.site.get('server').get('baseUrl');
      var embedded = Boolean(this.props.site.get('embedded'));
      var maxWidth = 0;
      if (this.props.site.has('maxWidth')) {
          if (this.props.site.get('maxWidth') != null) {
              maxWidth = Number(this.props.site.get('maxWidth'));
          }
      }
      if (!baseUrl.endsWith('/')) baseUrl += '/';
      var url = baseUrl + shortName;
      var nParams = 0;
      if (embedded) nParams++;
      if (maxWidth) nParams++;
      if (nParams > 0) {
          var added = "?";
          if (embedded) {
              url += "?embedded=true";
              if (maxWidth > 0) url += "&max-width="+ maxWidth;
          }
          else if (maxWidth > 0) url += "?max-width=" + maxWidth;
      }
      // create history object
      window.history.pushState({
          page: shortName,
          embedded: this.props.site.embedded
      }, "", url);
  }
}

Site.propTypes = {
  site: PropTypes.object.isRequired,
};

export default Site;
