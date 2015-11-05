import { fromJS } from 'immutable';
import Page from '../components/layout/Page';

/*
 * Load all the available components for use
 */
import SimpleCard from '../components/display/SimpleCard';

function initializeComponentClasses() {
  let components = {};
  components['SimpleCard'] = SimpleCard;
  return components;
}

function createComponent(currentId, spec, site) {
  // We basically clone the component spec, but also register IDs of all cards and datasets with the site.
  let component = {
    id:          currentId + "",
    componentClass: site.componentClasses[spec.componentName],
    cards:       {},
    datasets:    {},
    properties:  {}
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
      component.datasets[key] ={
        ids: []
      };
      item.ids.forEach(function(id) {
        component.datasets[key].ids.push(id+"");
      });
    }
  }
  for (let key in spec.componentProps) {
    component.properties[key] = spec.componentProps[key];
  }
  return component;
}

export function initializeSite (inputSite) {
  // This is a global ID - we'll need to to access other parts of the state
  // associated with a component.
  let componentId = 0; 
  let classes = initializeComponentClasses();
  let site = {
    name:             inputSite.name,
    slug:             inputSite.slug,
    currentPage:      inputSite.currentPage,
    embedded:         inputSite.embedded,
    pages:            {},
    menu:             [], 
    componentClasses:    classes,
    components:          {}
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
          let c = createComponent(currentId, componentSpec, site);
          site.components[currentId] = c;
          column.components[componentIndex] = "" + currentId;
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


