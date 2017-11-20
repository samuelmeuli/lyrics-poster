import { connect } from 'react-redux';

import Canvas from './Canvas';
import * as actions from '../redux/actions';


// map Redux state to component props
function mapStateToProps(state) {
	return {
		downloadURL: state.downloadURL,
		fontSize: state.fontSize,
		imageAspectRatio: state.imageAspectRatio,
		imageHeight: state.imageHeight,
		imageURL: state.imageURL,
		lyrics: state.lyrics
	};
}

// map Redux actions to component props
function mapDispatchToProps(dispatch) {
	return {
		setDownloadURL: newDownloadURL => dispatch(actions.setDownloadURL(newDownloadURL)),
		setImage: (newImageAspectRatio, newImageURL) =>
			dispatch(actions.setImage(newImageAspectRatio, newImageURL))
	};
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Canvas);