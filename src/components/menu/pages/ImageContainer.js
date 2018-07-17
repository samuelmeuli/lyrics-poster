import { connect } from 'react-redux';

import Image from './Image';
import * as actions from '../../../redux/actions';


// map Redux state to component props
function mapStateToProps(state) {
	return {
		completedPages: state.nav.completedPages,
		exceedsSizeLimit: state.poster.exceedsSizeLimit,
		image: state.image,
		navPage: state.nav.page,
		posterHeight: state.poster.height
	};
}

// map Redux actions to component props
function mapDispatchToProps(dispatch) {
	return {
		setCompletedPage: (navPage, isCompleted) =>
			dispatch(actions.setCompletedPage(navPage, isCompleted)),
		setFontSize: fontSize => dispatch(actions.setFontSize(fontSize)),
		setImage: (aspectRatio, dataURL, name) =>
			dispatch(actions.setImage(aspectRatio, dataURL, name)),
		setPosterHeight: height => dispatch(actions.setPosterHeight(height))
	};
}

export default connect(mapStateToProps,	mapDispatchToProps)(Image);
