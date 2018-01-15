import { connect } from 'react-redux';

import Nav from './Nav';
import * as actions from '../../../../redux/actions';


// map Redux state to component props
function mapStateToProps(state) {
	return {
		navPage: state.navPage
	};
}

// map Redux actions to component props
function mapDispatchToProps(dispatch) {
	return {
		navBack: () => dispatch(actions.navBack()),
		navForward: () => dispatch(actions.navForward())
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Nav);