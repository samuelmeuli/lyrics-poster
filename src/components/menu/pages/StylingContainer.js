import { connect } from 'react-redux';

import Styling from './Styling';
import * as actions from '../../../redux/actions';


// map Redux state to component props
function mapStateToProps(state) {
	return {
		fontSize: state.text.fontSize
	};
}

// map Redux actions to component props
function mapDispatchToProps(dispatch) {
	return {
		setFontSize: fontSize => dispatch(actions.setFontSize(fontSize))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Styling);