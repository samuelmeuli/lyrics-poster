import { connect } from 'react-redux';

import Canvas from './Canvas';
import * as actions from '../redux/actions';


// map Redux state to component props
function mapStateToProps(state) {
	return {
		downloadUrl: state.downloadUrl,
		fontSize: state.fontSize,
		imageAspectRatio: state.imageAspectRatio,
		imageHeight: state.imageHeight,
		lyrics: state.lyrics
	};
}

// map Redux actions to component props
function mapDispatchToProps(dispatch) {
	return {
		setDownloadUrl: newDownloadUrl => dispatch(actions.setDownloadUrl(newDownloadUrl)),
		setImageAspectRatio: newImageAspectRatio =>
			dispatch(actions.setImageAspectRatio(newImageAspectRatio))
	};
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Canvas);