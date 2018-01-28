import { connect } from 'react-redux';

import Styling from './Styling';
import * as actions from '../../../redux/actions';


// map Redux state to component props
function mapStateToProps(state) {
	return {
		backgroundColor: state.poster.backgroundColor,
		fontFamily: state.text.fontFamily,
		fontSize: state.text.fontSize,
		lineHeight: state.text.lineHeight
	};
}

// map Redux actions to component props
function mapDispatchToProps(dispatch) {
	return {
		setBackgroundColor: backgroundColor => dispatch(actions.setBackgroundColor(backgroundColor)),
		setFontFamily: fontFamily => dispatch(actions.setFontFamily(fontFamily)),
		setFontSize: fontSize => dispatch(actions.setFontSize(fontSize)),
		setLineHeight: lineHeight => dispatch(actions.setLineHeight(lineHeight))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Styling);