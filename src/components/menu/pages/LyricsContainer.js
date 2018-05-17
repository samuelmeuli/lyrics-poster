import { connect } from 'react-redux';

import Lyrics from './Lyrics';
import * as actions from '../../../redux/actions';


// map Redux state to component props
function mapStateToProps(state) {
	return {
		lyrics: state.text.lyrics,
		separator: state.text.separator
	};
}

// map Redux actions to component props
function mapDispatchToProps(dispatch) {
	return {
		setLyrics: lyrics => dispatch(actions.setLyrics(lyrics)),
		setSeparator: separator => dispatch(actions.setSeparator(separator))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lyrics);