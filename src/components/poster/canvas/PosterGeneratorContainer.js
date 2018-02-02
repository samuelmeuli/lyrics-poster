import { connect } from 'react-redux';

import PosterGenerator from './PosterGenerator';
import * as actions from '../../../redux/actions';


// map Redux state to component props
function mapStateToProps(state) {
	return {
		image: state.image,
		posterBackground: state.poster.backgroundColor,
		posterBrightness: state.poster.brightness,
		posterContrast: state.poster.contrast,
		posterHeight: state.poster.height,
		text: state.text
	};
}

// map Redux actions to component props
function mapDispatchToProps(dispatch) {
	return {
		setIsLoading: isLoading => dispatch(actions.setIsLoading(isLoading)),
		setPosterURL: dataURL => dispatch(actions.setPosterURL(dataURL))
	};
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PosterGenerator);