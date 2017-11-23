import { connect } from 'react-redux';

import ImageSelector from './ImageSelector';
import * as actions from '../../redux/actions';


// map Redux actions to component props
function mapDispatchToProps(dispatch) {
	return {
		setImage: (newImageAspectRatio, newImageURL) =>
			dispatch(actions.setImage(newImageAspectRatio, newImageURL))
	};
}


export default connect(
	null,
	mapDispatchToProps
)(ImageSelector);