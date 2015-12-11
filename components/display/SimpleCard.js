import React, { Component, PropTypes } from 'react';

class SimpleCard extends Component {

  shouldComponentUpdate (nextProps, nextState) {
    return (nextProps.cardsets !== this.props.cardsets ||
            nextProps.datasets !== this.props.datasets);
    // But what about later internal state?
  }

  renderTitle(card, tagLevel) {
    if (tagLevel && tagLevel > 0) {
      switch (tagLevel) {
        case 1:
            return <h1>{card.get('title')}</h1>
            break;
        case 2:
            return <h2>{card.get('title')}</h2>
            break;
        case 3:
            return <h3>{card.get('title')}</h3>
            break;
        case 4:
            return <h4>{card.get('title')}</h4>
            break;
        case 5:
            return <h5>{card.get('title')}</h5>
            break;

      }
    }
  }

  render() {
    let configuration = this.props.configuration;
    let card = this.props.cardsets.get('mycard').get(0);
    if (card == undefined) {
      return <div>SimpleCard loading...</div>
    }
    else {
      return (
        <div className="row">
          <div className="col-d-12">
            {this.renderTitle(card, Number(configuration.get('headerTag')))}

            <span dangerouslySetInnerHTML={{__html: card.get('body').get(0)}} />
          </div>
        </div>
      );
    }
    return <p> I am just a simple card </p>
  }
}

SimpleCard.PropTypes = {
  configuration: PropTypes.object.isRequired,
  cardsets: PropTypes.object.isRequired,
  datasets: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default SimpleCard;
