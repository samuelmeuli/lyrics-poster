import React from 'react';
import PropTypes from 'prop-types';

import NavContainer from '../elements/NavContainer';


export default function LandingPage(props) {
	return (
		<form>
			<div>
				<p>
					Create posters of your favorite artists written in their lyrics!
				</p>
				<p>
					LyricsPoster allows you to simply select an image of an artist and add song lyrics which
					will be used to create the image. In a simple and intuitive editor, you can then customize
					the image, background color, font, and more.
				</p>
				<p>
					Image and text are not uploaded; all editing is done locally on your device.
				</p>
			</div>
			<NavContainer navigate={props.navigate} />
		</form>
	);
}

LandingPage.propTypes = {
	// other props
	navigate: PropTypes.func.isRequired
};
