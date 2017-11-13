import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class Tools extends Component {

	render() {
		return (
			<div className="tools-container">
				<label htmlFor="font-size">Font size:</label>
				<input
					type="number"
					name="font-size"
					value={this.props.fontSize}
					onChange={this.props.setFontSize}
				/>

				<label htmlFor="lyrics">Lyrics:</label>
				<input
					type="text"
					name="lyrics"
					value={this.props.lyrics}
					onChange={this.props.setLyrics}
				/>

				<p>Image height: {this.props.imageHeight}</p>
				<p>Image width: {this.props.imageWidth}</p>
			</div>
		);
	}
}

Tools.propTypes = {
	fontSize: PropTypes.number.isRequired,
	imageHeight: PropTypes.number.isRequired,
	imageWidth: PropTypes.number.isRequired,
	lyrics: PropTypes.string.isRequired,

	setFontSize: PropTypes.func.isRequired,
	setLyrics: PropTypes.func.isRequired
};