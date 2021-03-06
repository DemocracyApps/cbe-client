import { fromJS } from 'immutable';
import Page from '../components/layout/Page';

/*
 * Load all the available components for use
 */
import SimpleCard from '../components/display/SimpleCard';
import HistoryTable from '../components/display/ShowMePage/HistoryTable';
import ShowMePage from '../components/display/ShowMePage/ShowMePage';
import WhatsNewPage from '../components/display/WhatsNewPage/WhatsNewPage';

function initializeComponentClasses() {
  let components = {};
  components['SimpleCard'] = SimpleCard;
  components['HistoryTable'] = HistoryTable;
  components['ShowMePage'] = ShowMePage;
  components['WhatsNewPage'] = WhatsNewPage;
  return components;
}

function createComponent(currentId, spec, site, dataModelManager) {
  // We basically clone the component spec, but also register IDs of all cards and datasets with the site.
  let component = {
    id:          currentId + "",
    componentClass: site.componentClasses[spec.componentName],
    cards:       {},
    models:      {},
    properties:  {},
    state:       {}
  };
  for (let key in spec.componentData) {
    let item = spec.componentData[key];
    if (item.type == 'card') {
      component.cards[key] = {
        ids: []
      };
      item.ids.forEach(function (id) {
        component.cards[key].ids.push(id+"");
      });
    }
    else {
      if (item.ids.length > 0) { // Don't register models with no data
        component.models[key] = dataModelManager.registerDataModel(item.type, key, item.ids);
      }
      else {
        console.log("Component " + spec.componentName + ": dataset " + key + " dropped - no data.");
      }
    }
  }
  for (let key in spec.componentProps) {
    component.properties[key] = spec.componentProps[key];
  }
  component.state = spec.componentState;
  return component;
}

function parseQueryString(query) {
  var query_string = {};
  if (query.length > 0) {
      var vars = query.split("&");
      for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
            // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
          query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
          var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
          query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
          query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
      }
    }
    return query_string;
};

export function initializeSite (inputSite, dataModelManager) {
  // This is a global ID - we'll need to to access other parts of the state
  // associated with a component.
  let componentId = 0; 
  let classes = initializeComponentClasses();
  let currentPage = window.location.pathname.substring(1);
  let params = parseQueryString(window.location.search.substring(1));

  let site = {
    server:           inputSite.server,
    name:             inputSite.name,
    slug:             inputSite.slug,
    currentPage:      currentPage,
    urlParams:        window.location.search,
    embedded:         ('embedded' in params)?params.embedded:null,
    maxWidth:         ('max-width' in params)?params['max-width']:null,
    pages:            {},
    menu:             [], 
    componentClasses:    classes,
    components:          {},
    requiredDatasets:     {}
  };
  // Now set up the pages, menu and component arrays.
  for (let i=0; i<inputSite.pages.length; ++i) {
    let pageSpec = inputSite.pages[i];

    site.menu.push(pageSpec.shortName);
    let page = {
      shortName:   pageSpec.shortName,
      title:       pageSpec.title,
      menuName:    pageSpec.menuName,
      description: pageSpec.description,
      layout:      {rows: []}
    };
    site.pages[page.shortName] = page;
    // The layout is basically just a set of rows and columns, with each column
    // containining one or more components. Rows and columns will be converted to 
    // <div>s using bootstrap classes (and so we store class and style information
    // to use in constructing them). Each column then contains 1 or more components.
    // We only store the component ID in the column. The component specs themselves are
    // kept in site.components.

    // Handle each row
    pageSpec.layout.rows.forEach(function (rowSpec, rowIndex) {
      let row = {style: null, columns: []};
      // Now handle each column in the row
      rowSpec.columns.forEach(function(colSpec, colIndex) {
        let column = {
          class:      colSpec.class,
          style:      colSpec.style,
          components:    []
        };
        // Now deal with each component in the column
        colSpec.components.forEach(function(componentSpec, componentIndex) {
          let currentId = componentId++;
          let c = createComponent(currentId, componentSpec, site, dataModelManager);
          site.components[currentId] = c;
          column.components[componentIndex] = "" + currentId;
          for (let dsId in c.requiredDatasets) { site.requiredDatasets[dsId] = true;}
        }); // End of components forEach
        row.columns[colIndex] = column;
      }); // End of columns forEach
      page.layout.rows[rowIndex] = row;
    }); // End of page.rows forEach
  }

  return fromJS(site);
}

export function initializeCards (inputCards) {
  let cards = {};
  inputCards.forEach(function (item, index) {
    let card = {
      id: item.id,
      title: item.title,
      body: item.body,
      image: item.image,
      link: item.link
    };
    cards[item.id] = card;
  });

  return fromJS(cards);
}


