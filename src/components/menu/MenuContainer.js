import { connect } from 'react-redux';

import Menu from './Menu';


// map Redux state to component props
function mapStateToProps(state) {
	return {
		navPage: state.nav.page
	};
}

export default connect(mapStateToProps)(Menu);