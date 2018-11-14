import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FileSaver from 'file-saver';

import NavContainer from '../elements/NavContainer';


export default class Download extends Component {

	downloadPoster() {
		const blob = this.dataURItoBlob(this.props.posterURL);
		FileSaver.saveAs(blob, 'lyrics-poster.png');
	}

	// source: https://stackoverflow.com/questions/12168909/blob-from-dataurl
	dataURItoBlob(dataURI) {
		// convert base64 to raw binary data held in a string
		const byteString = atob(dataURI.split(',')[1]);

		// separate out the mime component
		const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

		// write the bytes of the string to an ArrayBuffer
		const ab = new ArrayBuffer(byteString.length);

		// create a view into the buffer
		const ia = new Uint8Array(ab);

		// set the bytes of the buffer to the correct values
		for (let i = 0; i < byteString.length; i += 1) {
			ia[i] = byteString.charCodeAt(i);
		}

		// write the ArrayBuffer to a blob
		return new Blob([ab], { type: mimeString });
	}

	render() {
		return (
			<form onSubmit={this.updateSettings} noValidate>
				<fieldset>
					<legend>Download</legend>
					<p>
						Congrats, you have finished your lyrics poster! You can now download the image and
						use it with a poster printing service.
					</p>
					<p>
						Thank you for using Lyrics Poster!
					</p>
					<button type="button" onClick={() => this.downloadPoster()}>
						Download poster
					</button>
				</fieldset>
				<NavContainer navigate={this.props.navigate} showApply={false} />
			</form>
		);
	}
}


Download.propTypes = {
	// Redux attributes
	posterURL: PropTypes.string.isRequired,

	// other props
	navigate: PropTypes.func.isRequired
};
