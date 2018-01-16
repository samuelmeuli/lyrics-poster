import { connect } from 'react-redux';

import Image from './Image';
import * as actions from '../../../redux/actions';


// map Redux state to component props
function mapStateToProps(state) {
	return {
		image: state.image,
		posterHeight: state.poster.height
	};
}

// map Redux actions to component props
function mapDispatchToProps(dispatch) {
	return {
		setImage: (aspectRatio, dataURL, name) =>
			dispatch(actions.setImage(aspectRatio, dataURL, name)),
		setPosterHeight: height => dispatch(actions.setPosterHeight(height))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Image);