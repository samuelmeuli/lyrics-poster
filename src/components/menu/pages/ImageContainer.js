import { connect } from 'react-redux';

import Image from './Image';
import * as actions from '../../../redux/actions';


// map Redux state to component props
function mapStateToProps(state) {
	return {
		imageAspectRatio: state.imageAspectRatio,
		imageHeight: state.imageHeight,
		imageURL: state.imageURL
	};
}

// map Redux actions to component props
function mapDispatchToProps(dispatch) {
	return {
		setImageHeight: newImageHeight => dispatch(actions.setImageHeight(newImageHeight))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Image);