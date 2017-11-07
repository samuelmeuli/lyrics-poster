import { connect } from 'react-redux';

import Canvas from './Canvas';


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

export default connect(mapStateToProps)(Canvas);