import { connect } from 'react-redux';

import Download from './Download';


// map Redux state to component props
function mapStateToProps(state) {
	return {
		posterURL: state.poster.dataURL
	};
}

export default connect(mapStateToProps)(Download);