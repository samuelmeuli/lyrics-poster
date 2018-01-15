import { connect } from 'react-redux';

import ImageSelector from './ImageSelector';
import * as actions from '../../../redux/actions';


// map Redux state to component props
function mapStateToProps(state) {
	return {
		imageName: state.imageName
	};
}

// map Redux actions to component props
function mapDispatchToProps(dispatch) {
	return {
		setImage: (newImageURL, newImageAspectRatio, newImageName) =>
			dispatch(actions.setImage(newImageURL, newImageAspectRatio, newImageName))
	};
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ImageSelector);