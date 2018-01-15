import { connect } from 'react-redux';

import Poster from './Poster';
import * as actions from '../../redux/actions';
import Styling from '../menu/pages/Styling';


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

// map Redux actions to component props
function mapDispatchToProps(dispatch) {
	return {
		setPosterURL: newPosterURL => dispatch(actions.setPosterURL(newPosterURL))
	};
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Poster);