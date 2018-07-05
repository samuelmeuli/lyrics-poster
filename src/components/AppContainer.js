import { connect } from 'react-redux';

import App from './App';
import * as actions from '../redux/actions';


// map Redux state to component props
function mapStateToProps(state) {
	return {
		completedPages: state.nav.completedPages
	};
}

// map Redux actions to component props
function mapDispatchToProps(dispatch) {
	return {
		setNavPage: navPage => dispatch(actions.setNavPage(navPage))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
