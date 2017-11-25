import { connect } from 'react-redux';

import Settings from './Settings';
import * as actions from '../../../redux/actions';


// map Redux state to component props
function mapStateToProps(state) {
	return {
		fontSize: state.fontSize,
		imageAspectRatio: state.imageAspectRatio,
		imageHeight: state.imageHeight,
		lyrics: state.lyrics
	};
}

// map Redux actions to component props
function mapDispatchToProps(dispatch) {
	return {
		setFontSize: newFontSize => dispatch(actions.setFontSize(newFontSize)),
		setImageHeight: newImageHeight => dispatch(actions.setImageHeight(newImageHeight)),
		setLyrics: newLyrics => dispatch(actions.setLyrics(newLyrics))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Settings);