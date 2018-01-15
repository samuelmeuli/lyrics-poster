import { connect } from 'react-redux';

import Lyrics from './Lyrics';
import * as actions from '../../../redux/actions';


// map Redux state to component props
function mapStateToProps(state) {
	return {
		lyrics: state.lyrics
	};
}

// map Redux actions to component props
function mapDispatchToProps(dispatch) {
	return {
		setLyrics: newLyrics => dispatch(actions.setLyrics(newLyrics))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lyrics);