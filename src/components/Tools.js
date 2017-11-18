import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class Tools extends Component {

	constructor(props) {
		super(props);

		// state contains the input field values
		this.state = {
			newFontSize: this.props.fontSize,
			newImageHeight: this.props.imageHeight,
			newImageWidth: this.props.imageHeight * this.props.imageAspectRatio,
			newLyrics: this.props.lyrics
		};

		// function bindings
		this.updateSettings = this.updateSettings.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		// settings have changed -> update input fields values
		if (nextProps !== this.props) {
			this.setState({
				newFontSize: nextProps.fontSize,
				newImageHeight: nextProps.imageHeight,
				newImageWidth: nextProps.imageHeight * nextProps.imageAspectRatio,
				newLyrics: nextProps.lyrics
			});
		}
	}

	updateSettings(event) {
		event.preventDefault();

		// update Redux state with form values
		this.props.setFontSize(this.state.newFontSize);
		this.props.setImageHeight(this.state.newImageHeight);
		this.props.setLyrics(this.state.newLyrics);
	}

	render() {
		return (
			<div className="tools-container">
				<form onSubmit={this.updateSettings}>

					<label htmlFor="font-size">Font size:</label>
					<input
						type="number"
						name="font-size"
						value={this.state.newFontSize}
						onChange={e => this.setState({ newFontSize: parseInt(e.target.value, 10) })}
					/>

					<label htmlFor="lyrics">Lyrics:</label>
					<input
						type="text"
						name="lyrics"
						value={this.state.newLyrics}
						onChange={e => this.setState({ newLyrics: e.target.value })}
					/>

					<label htmlFor="image-height">Height:</label>
					<input
						type="number"
						name="image-height"
						value={Math.round(this.state.newImageHeight * 10) / 10}
						onChange={e => this.setState({ newImageHeight: parseFloat(e.target.value) })}
						onBlur={e => this.setState({
							newImageWidth: parseFloat(e.target.value) * this.props.imageAspectRatio
						})}
					/>

					<label htmlFor="image-width">Width:</label>
					<input
						type="number"
						name="image-width"
						value={Math.round(this.state.newImageWidth * 10) / 10}
						onChange={e => this.setState({ newImageWidth: parseFloat(e.target.value) })}
						onBlur={e => this.setState({
							newImageHeight: parseFloat(e.target.value) / this.props.imageAspectRatio
						})}
					/>

					<input type="submit" value="Apply" />

				</form>
			</div>
		);
	}
}

Tools.propTypes = {
	fontSize: PropTypes.number.isRequired,
	imageAspectRatio: PropTypes.number.isRequired,
	imageHeight: PropTypes.number.isRequired,
	lyrics: PropTypes.string.isRequired,

	setFontSize: PropTypes.func.isRequired,
	setImageHeight: PropTypes.func.isRequired,
	setLyrics: PropTypes.func.isRequired
};