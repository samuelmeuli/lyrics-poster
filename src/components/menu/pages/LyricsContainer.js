import { connect } from 'react-redux';

import Lyrics from './Lyrics';
import * as actions from '../../../redux/actions';


// map Redux state to component props
function mapStateToProps(state) {
	return {
		lyrics: state.text.lyrics
	};
}

// map Redux actions to component props
function mapDispatchToProps(dispatch) {
	return {
		setLyrics: lyrics => dispatch(actions.setLyrics(lyrics))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lyrics);