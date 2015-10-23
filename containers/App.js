import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Site from '../components/Site';
import * as SiteActions from '../state/actions/siteActions';

function mapStateToProps(state) {
  return {
    counter: state.counter,
    site: state.site
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SiteActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Site);
