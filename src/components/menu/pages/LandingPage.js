import React from 'react';
import PropTypes from 'prop-types';

import NavContainer from '../elements/NavContainer';


export default function LandingPage(props) {
	return (
		<div>
			<p>TODO info page with poster example</p>
			<NavContainer navigate={props.navigate} />
		</div>
	);
}

LandingPage.propTypes = {
	// other props
	navigate: PropTypes.func.isRequired
};
