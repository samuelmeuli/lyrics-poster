import { connect } from 'react-redux';

import Tools from './Tools';
import * as actions from '../redux/actions';


// map Redux state to component props
function mapStateToProps(state) {
	return {
		image: state.image,
		imageHeight: state.imageHeight,
		imageWidth: state.imageWidth,
		fontSize: state.fontSize,
		lyrics: state.lyrics
	};
}

// map Redux actions to component props
function mapDispatchToProps(dispatch) {
	return {
		setImageHeight: newImageHeight => dispatch(actions.setImageHeight(newImageHeight)),
		setImageWidth: newImageWidth => dispatch(actions.setImageWidth(newImageWidth)),
		setFontSize: event => dispatch(actions.setFontSize(event.target.value)),
		setLyrics: event => dispatch(actions.setLyrics(event.target.value))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Tools);