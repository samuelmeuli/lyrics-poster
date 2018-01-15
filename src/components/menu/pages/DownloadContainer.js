import { connect } from 'react-redux';

import Download from './Download';


// map Redux state to component props
function mapStateToProps(state) {
	return {
		posterURL: state.posterURL
	};
}

export default connect(mapStateToProps)(Download);