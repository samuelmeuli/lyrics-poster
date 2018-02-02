import { connect } from 'react-redux';

import PosterPreview from './PosterPreview';


// map Redux state to component props
function mapStateToProps(state) {
	return {
		aspectRatio: state.image.aspectRatio,
		isLoading: state.poster.isLoading,
		posterHeight: state.poster.height,
		posterURL: state.poster.dataURL
	};
}

export default connect(mapStateToProps)(PosterPreview);