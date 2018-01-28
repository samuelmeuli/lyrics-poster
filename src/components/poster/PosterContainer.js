import { connect } from 'react-redux';

import Poster from './Poster';
import * as actions from '../../redux/actions';


// map Redux state to component props
function mapStateToProps(state) {
	return {
		image: state.image,
		posterBackground: state.poster.backgroundColor,
		posterHeight: state.poster.height,
		text: state.text
	};
}

// map Redux actions to component props
function mapDispatchToProps(dispatch) {
	return {
		setPosterURL: dataURL => dispatch(actions.setPosterURL(dataURL))
	};
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Poster);