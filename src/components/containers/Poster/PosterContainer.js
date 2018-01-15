import { connect } from 'react-redux';

import Poster from './Poster';


// map Redux state to component props
function mapStateToProps(state) {
	return {
		fontSize: state.fontSize,
		imageAspectRatio: state.imageAspectRatio,
		imageHeight: state.imageHeight,
		imageURL: state.imageURL,
		lyrics: state.lyrics
	};
}


export default connect(mapStateToProps)(Poster);