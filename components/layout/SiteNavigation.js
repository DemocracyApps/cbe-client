import React, { Component, PropTypes } from 'react';
import 'jquery';
import bootstrap, {navbar, navs} from 'bootstrap-sass';

class SiteNavigation extends Component {

  render () {
    const site = this.props.site;
    const currentPage = this.props.site.get('currentPage');
    let pages = site.get('pages').toArray();
    let navItem = function (item, index) {
      var selectPage = function(e) {
        this.props.actions.gotoPage(item.get('shortName'));
      }.bind(this);
      let itemClass = (item.get('shortName') == currentPage)?"active":"";

      return <li key={index} className={itemClass} > <a id="menuPage{index}" 
                                  onClick={selectPage}
                                  href="#">{item.get('menuName')}</a> </li>
    };
    let homeItem = function () { return (
        <li> 
            <a href="#"><i style={{float:"right"}}  className="fa fa-home"></i></a>
        </li>
    );}
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#" onClick={this.goHome}>
                        <span style={{fontWeight:"600"}}>{site.get('name')}</span></a>
                </div>
                <div id="navbar" className="navbar-collapse collapse">

                    <ul className="nav navbar-nav">
                        {pages.map(navItem,this)}
                        {homeItem()}
                    </ul>
                </div>
            </div>
        </nav>
    );

  }

}

SiteNavigation.PropTypes = {
  site:     PropTypes.object.isRequired,
};

export default SiteNavigation;