import { connect } from 'react-redux';

import Canvas from './Canvas';
import * as actions from '../redux/actions';


// map Redux state to component props
function mapStateToProps(state) {
	return {
		downloadUrl: state.downloadUrl,
		fontSize: state.fontSize,
		imageHeight: state.imageHeight,
		imageWidth: state.imageWidth,
		lyrics: state.lyrics
	};
}

// map Redux actions to component props
function mapDispatchToProps(dispatch) {
	return {
		setDownloadUrl: newDownloadUrl => dispatch(actions.setDownloadUrl(newDownloadUrl)),
		setImageHeight: newImageHeight => dispatch(actions.setImageHeight(newImageHeight)),
		setImageWidth: newImageWidth => dispatch(actions.setImageWidth(newImageWidth))
	};
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Canvas);