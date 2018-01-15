import { connect } from 'react-redux';

import Download from './Download';
import * as actions from '../../../../redux/actions';


// map Redux state to component props
function mapStateToProps(state) {
	return {
	};
}

// map Redux actions to component props
function mapDispatchToProps(dispatch) {
	return {
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Download);