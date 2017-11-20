import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageSelectorContainer from './ImageSelectorContainer';


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

		// update Redux state with form values (if they have changed)
		if (this.state.newFontSize !== this.props.fontSize) {
			this.props.setFontSize(this.state.newFontSize);
		}
		if (this.state.newImageHeight !== this.props.imageHeight) {
			this.props.setImageHeight(this.state.newImageHeight);
		}
		if (this.state.newLyrics !== this.props.lyrics) {
			this.props.setLyrics(this.state.newLyrics);
		}
	}

	render() {
		return (
			<div className="tools-container">
				<form onSubmit={this.updateSettings}>

					<ImageSelectorContainer />

					<label htmlFor="input-font-size">
						Font size:
						<input
							type="number"
							id="input-font-size"
							value={this.state.newFontSize}
							onChange={e => this.setState({ newFontSize: parseInt(e.target.value, 10) })}
						/>
					</label>

					<label htmlFor="input-lyrics">
						Lyrics:
						<input
							type="text"
							id="input-lyrics"
							value={this.state.newLyrics}
							onChange={e => this.setState({ newLyrics: e.target.value })}
						/>
					</label>

					<label htmlFor="input-image-height">
						Height:
						<input
							type="number"
							id="input-image-height"
							value={Math.round(this.state.newImageHeight)}
							onChange={e => this.setState({ newImageHeight: parseFloat(e.target.value) })}
							onBlur={e => this.setState({
								newImageWidth: parseFloat(e.target.value) * this.props.imageAspectRatio
							})}
						/>
					</label>

					<label htmlFor="input-image-width">
						Width:
						<input
							type="number"
							id="input-image-width"
							value={Math.round(this.state.newImageWidth)}
							onChange={e => this.setState({ newImageWidth: parseFloat(e.target.value) })}
							onBlur={e => this.setState({
								newImageHeight: parseFloat(e.target.value) / this.props.imageAspectRatio
							})}
						/>
					</label>

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