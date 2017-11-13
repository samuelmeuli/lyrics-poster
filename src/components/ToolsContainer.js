import { connect } from 'react-redux';

import Tools from './Tools';
import * as actions from '../redux/actions';


// map Redux state to component props
function mapStateToProps(state) {
	return {
		fontSize: state.fontSize,
		image: state.image,
		imageHeight: state.imageHeight,
		imageWidth: state.imageWidth,
		lyrics: state.lyrics
	};
}

// map Redux actions to component props
function mapDispatchToProps(dispatch) {
	return {
		setFontSize: event => dispatch(actions.setFontSize(parseInt(event.target.value, 10))),
		setLyrics: event => dispatch(actions.setLyrics(event.target.value))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Tools);