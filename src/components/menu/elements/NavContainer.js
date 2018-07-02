import { connect } from 'react-redux';

import Nav from './Nav';


// map Redux state to component props
function mapStateToProps(state) {
	return {
		navPage: state.nav.page
	};
}

export default connect(mapStateToProps)(Nav);
