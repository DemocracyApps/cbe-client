import React, { Component, PropTypes } from 'react';
import 'jquery';
import bootstrap, {navbar, navs} from 'bootstrap';

class SiteNavigation extends Component {

  render () {
    const site = this.props.site;
    let pages = site.get('pages').toArray();
    // let pages = [
    //     {menuName: "Overview"},
    //     {menuName: "Show Me"},
    //     {menuName: "Breakdown"}
    // ];
    let navItem = function (item, index) {
      return <li key={index} > <a id="menuPage{index}" href="#">{item.get('menuName')}</a> </li>
    };
    let homeItem = function () { return <li><a href="#"> <i style={{float:"right"}}  className="fa fa-home"></i></a> </li> }
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
                        <span style={{fontWeight:"600"}}>{this.props.site.name}</span></a>
                </div>
                <div id="navbar" className="navbar-collapse collapse">

                    <ul className="nav navbar-nav">
                        {pages.map(navItem)}
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