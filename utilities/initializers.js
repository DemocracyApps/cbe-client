import { fromJS } from 'immutable';
import Page from '../components/layout/Page';

/*
 * Load all the available components for use
 */
import SimpleCard from '../components/widgets/SimpleCard';

function initializeWidgetClasses() {
  let widgets = {};
  widgets['SimpleCard'] = SimpleCard;
  return widgets;
}

function createWidget(currentId, spec, site) {
  // We basically clone the widget spec, but also register IDs of all cards and datasets with the site.
  let widget = {
    id:          currentId,
    widgetClass: site.widgetClasses[spec.componentName],
    cards:       {},
    datasets:    {},
    properties:  {}
  };

  for (let key in spec.componentData) {
    let item = spec.componentData[key];
    if (item.type == 'card') {
      widget.cards[key] = {
        ids: []
      };
      item.ids.forEach(function (id) {
        widget.cards[key].ids.push(id);
        site.cardIds[id] = true;
      });
    }
    else {
      widget.datasets[key] ={
        ids: []
      };
      item.ids.forEach(function(id) {
        widget.datasets[key].ids.push(id);
        site.datasetIds[id] = true;
      });
    }
  }
  for (let key in spec.componentProps) {
    widget.properties[key] = spec.componentProps[key];
  }
  return widget;
}

export function initializeSite (inputConfig) {
  // This is a global ID - we'll need to to access other parts of the state
  // associated with a widget.
  let widgetId = 0; 
  let classes = initializeWidgetClasses();
  let site = {
    name:             inputConfig.name,
    slug:             inputConfig.slug,
    currentPage:      inputConfig.currentPage,
    embedded:         inputConfig.embedded,
    pages:            {},
    menu:             [], 
    widgetClasses:    classes,
    cardIds:          {},
    datasetIds:       {}
  };
  // Now set up the pages, menu and widget arrays.
  for (let i=0; i<inputConfig.pages.length; ++i) {
    let pageSpec = inputConfig.pages[i];

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
    // containining one or more widgets. Rows and columns will be converted to 
    // <div>s using bootstrap classes (and so we store class and style information
    // to use in constructing them). Each column then contains 1 or more widgets.
    // We only store the widget ID in the column. The widget specs themselves are
    // kept in site.widgets.

    // Handle each row
    pageSpec.layout.rows.forEach(function (rowSpec, rowIndex) {
      let row = {style: null, columns: []};
      // Now handle each column in the row
      rowSpec.columns.forEach(function(colSpec, colIndex) {
        let column = {
          class:      colSpec.class,
          style:      colSpec.style,
          widgets:    []
        };
        // Now deal with each component in the column
        colSpec.components.forEach(function(componentSpec, componentIndex) {
          let currentId = widgetId++;
          column.widgets[componentIndex] = createWidget(currentId, componentSpec, site);
        }); // End of components forEach
        row.columns[colIndex] = column;
      }); // End of columns forEach
      page.layout.rows[rowIndex] = row;
    }); // End of page.rows forEach
  }

  return site;
}

export function initializeCards (inputCards) {
  let cards = {};

  return cards;
}


