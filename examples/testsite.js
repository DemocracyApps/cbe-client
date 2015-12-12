window.CBEVars = window.CBEVars || {};
CBEVars.site = [
{
  "site": {
    "server": {
      "apiUrl":"http://localhost:3000/api/v1",
      "baseUrl":"http://localhost:3000"
    },
    "name": "Asheville, NC Budget 2015-2016",
    "slug": "asheville",
    "pages": [
    {
      "title": "Welcome to the 2015-16 Asheville Budget Explorer!",
      "shortName": "Overview",
      "menuName": "Overview",
      "description": "This is just a test page.",
      "layout": {
        "rows": [
        {
          "columns": [
          {
            "id": "Top",
            "class": "col-xs-8",
            "style": {
              "margin": "0px 0px 45px"
            },
            "components": [
            {
              "componentName": "SimpleCard",
              "componentData": {
                "mycard": {
                  "type": "card",
                  "ids": [
                   17
                  ]
                },
                "mydataset": {
                  "type": "dataset",
                  "ids": [
                   4
                  ]
                }
              },
              "componentProps": {
                "headerTag": "1"
              },
              "componentState": [
              ]
            }
            ]
          }
          ]
        }]
      } // Layout
    }, {
      "title": "Show Me The Money!",
      "shortName": "ShowMe",
      "menuName": "ShowMe",
      "description": "This is the ShowMe page.",
      "layout": {
        "rows": [
        {
          "columns": [
            {
              "id": "Nothing",
              "class": "col-xs-12",
              "components":[
                {
                  "componentName": "ShowMePage",
                  "componentData": {
                    "spending": {
                      "type": "dataset",
                      "ids": [
                       1,2,3
                      ]
                    },
                    "revenue": {
                      "type": "dataset",
                      "ids": [5,6]
                    }
                  },
                  "componentProps": {
                    "startYear": "1"
                  },
                  "componentState": {
                    "accountType": {
                      "type": "string",
                      "array": false,
                      "value": "Spending",
                      "allowedValues": ["Spending", "Revenue"]
                    },
                    "displayMode": {
                      "type": "string",
                      "array": false,
                      "value":"Table",
                      "allowedValues": ["Chart", "Table"]
                    },
                    "year": {
                      "type": "number",
                      "array": false,
                      "value": null,
                      "allowedValues": null
                    },
                    "detailLevel": {
                      "type": "number",
                      "array": false,
                      "value": 0,
                      "allowedValues": null
                    }
                  }
                }
              ]
            }
          ]
        }
        ]
      }      
    },
    {
      "title": "What's New?",
      "shortName": "whatsnew",
      "menuName": "What's New?",
      "description": "This is the What's New page.",
      "layout": {
        "rows": [
        {
          "columns": [
            {
              "id": "Nothing",
              "class": "col-xs-12",
              "components":[
                {
                  "componentName": "WhatsNewPage",
                  "componentData": {
                    "spending": {
                      "type": "dataset",
                      "ids": [
                       1,2,3
                      ]
                    },
                    "revenue": {
                      "type": "dataset",
                      "ids": [5,6]
                    }
                  },
                  "componentProps": {
                    "startYear": "1"
                  },
                  "componentState": {
                    "accountType": {
                      "type": "string",
                      "array": false,
                      "value": "Spending",
                      "allowedValues": ["Spending", "Revenue"]
                    },
                    "displayMode": {
                      "type": "string",
                      "array": false,
                      "value":"Table",
                      "allowedValues": ["Chart", "Table"]
                    },
                    "detailLevel": {
                      "type": "number",
                      "array": false,
                      "value": 0,
                      "allowedValues": null
                    }
                  }
                }
              ]
            }
          ]
        }
        ]
      }      
    }] // Pages
  },
  "cards": [
  {
    "id": 17,
    "cardSet": 7,
    "title": "Full Proposed 2015-2016 Budget",
    "body": [
        "<p>Use the button below to download the full 2015-16 City of Asheville Proposed Budget document.</p>"
    ],
    "image": null,
    "link": "/docs/asheville/FY 2015- 16 Proposed Budget.pdf",
    "dataType": "card"
  },
  {
      "id": 8,
      "cardSet": 5,
      "title": "Revenue Highlights",
      "body": [
          "<ul>\n<li>1.5 cent property tax increase to 47.5 cents per $100 assessed value</li>\n<li>4% increase in sales tax revenue</li>\n<li>12% decrease in licensing and permitting revenue</li>\n<li>5.4% inter-governmental revenue increase in General Fund</li>\n<li>No appropriation from unassigned fund balance</li>\n</ul>"
      ],
      "image": "/img/cards/pic561588c2b5daa.jpg",
      "link": "/docs/asheville/Revenue_Summary.pdf",
      "dataType": "card"
  },
  {
      "id": 9,
      "cardSet": 5,
      "title": "Spending Highlights",
      "body": [
          "<ul>\n<li>3.6% overall increase in spending</li>\n<li>$1M increase in Public Safety</li>\n<li>$354,000 increase in Environment &amp; Transportation</li>\n<li>$250,000 increase for seasonal/temporary staff living wage</li>\n</ul>"
      ],
      "image": "/img/cards/pic561588c33b0e3.jpg",
      "link": "/docs/asheville/Expenditure_Summary.pdf",
      "dataType": "card"
  }
  ]
}];



