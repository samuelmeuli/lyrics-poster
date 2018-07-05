import React from 'react';
import PropTypes from 'prop-types';

import NavContainer from '../elements/NavContainer';


export default function LandingPage(props) {
	return (
		<form>
			<div>
				<p>TODO info page with poster example</p>
			</div>
			<NavContainer navigate={props.navigate} />
		</form>
	);
}

LandingPage.propTypes = {
	// other props
	navigate: PropTypes.func.isRequired
};
