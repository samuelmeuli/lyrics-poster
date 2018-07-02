import { connect } from 'react-redux';

import App from './App';
import * as actions from '../redux/actions';


// map Redux actions to component props
function mapDispatchToProps(dispatch) {
	return {
		setNavPage: navPage => dispatch(actions.setNavPage(navPage))
	};
}

export default connect(null, mapDispatchToProps)(App);
