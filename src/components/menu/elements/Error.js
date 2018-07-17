import React from 'react';
import PropTypes from 'prop-types';

import iconError from '../../../images/icons/error.svg';


export default function Error(props) {
	return (
		<div className="error-wrapper">
			<img src={iconError} alt="Error: " width={18} />
			<p>{props.message}</p>
		</div>
	);
}

Error.propTypes = {
	message: PropTypes.string.isRequired
};
