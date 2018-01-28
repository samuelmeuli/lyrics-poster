import { connect } from 'react-redux';

import Styling from './Styling';
import * as actions from '../../../redux/actions';


// map Redux state to component props
function mapStateToProps(state) {
	return {
		backgroundColor: state.poster.backgroundColor,
		brightness: state.poster.brightness,
		contrast: state.poster.contrast,
		fontFamily: state.text.fontFamily,
		fontSize: state.text.fontSize,
		lineHeight: state.text.lineHeight
	};
}

// map Redux actions to component props
function mapDispatchToProps(dispatch) {
	return {
		setBackgroundColor: backgroundColor => dispatch(actions.setBackgroundColor(backgroundColor)),
		setBrightness: brightness => dispatch(actions.setBrightness(brightness)),
		setContrast: contrast => dispatch(actions.setContrast(contrast)),
		setFontFamily: fontFamily => dispatch(actions.setFontFamily(fontFamily)),
		setFontSize: fontSize => dispatch(actions.setFontSize(fontSize)),
		setLineHeight: lineHeight => dispatch(actions.setLineHeight(lineHeight))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Styling);