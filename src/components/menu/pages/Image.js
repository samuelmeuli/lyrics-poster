import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputNumeric from 'react-input-numeric';

import ImageSelector from '../elements/ImageSelector';
import NavContainer from '../elements/NavContainer';


export default class Image extends Component {

	constructor(props) {
		super(props);

		this.min = 100;
		this.max = 10000;

		// state contains the form values
		this.state = {
			newImage: this.props.image,
			newPosterHeight: this.props.posterHeight,
			newPosterWidth: this.props.posterHeight * this.props.image.aspectRatio
		};

		// function bindings
		this.handleImageChange = this.handleImageChange.bind(this);
		this.updateSettings = this.updateSettings.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		// settings have changed -> update form values
		if (nextProps !== this.props) {
			this.setState({
				newPosterHeight: nextProps.posterHeight,
				newPosterWidth: nextProps.posterHeight * nextProps.image.aspectRatio
			});
		}
	}

	hasChanged() {
		return (
			this.state.newImage.dataURL !== this.props.image.dataURL ||
			this.state.newPosterHeight !== this.props.posterHeight
		);
	}

	handleImageChange(aspectRatio, dataURL, name) {
		this.setState({
			newImage: {
				aspectRatio,
				dataURL,
				name
			},
			newPosterWidth: this.state.newPosterHeight * aspectRatio
		});
	}

	updateSettings(event) {
		event.preventDefault();

		if (this.state.newImage.dataURL === '') {
			this.props.setCompletedPage(this.props.navPage, false);
		}
		else {
			this.props.setCompletedPage(this.props.navPage, true);
		}

		// update Redux state with form values (if they have changed)
		if (this.state.newImage.dataURL !== this.props.image.dataURL) {
			this.props.setImage(
				this.state.newImage.aspectRatio,
				this.state.newImage.dataURL,
				this.state.newImage.name
			);
		}
		if (this.state.newPosterHeight !== this.props.posterHeight) {
			this.props.setPosterHeight(this.state.newPosterHeight);
		}
		if (this.state.newImage.dataURL !== this.props.image.dataURL ||
				this.state.newPosterHeight !== this.props.posterHeight) {
			// Portrait
			if (this.props.image.aspectRatio > 1) {
				this.props.setFontSize(Math.round(this.state.newPosterHeight / 100));
			}
			// Landscape
			else {
				this.props.setFontSize(Math.round(this.state.newPosterHeight / 60));
			}
		}
	}

	render() {
		return (
			<form onSubmit={this.updateSettings} noValidate>
				<div>
					<fieldset>
						<legend>Image</legend>
						<p>
							Please upload an artist image. High contrast photos work best, e.g. images with a
							bright foreground and dark background.
						</p>
						<ImageSelector
							newImageName={this.state.newImage.name}
							onImageChange={this.handleImageChange}
						/>
					</fieldset>

					<fieldset className="fieldset-image-options">
						<legend>Image size</legend>
						<label htmlFor="input-image-height">
							<span className="label-left">Height:</span>
							<InputNumeric
								id="input-image-height"
								value={this.state.newPosterHeight}
								decimals={0}
								min={this.min}
								max={this.max}
								onBlur={(h) => {
									let newPosterHeight = h;
									let newPosterWidth = Math.round(newPosterHeight * this.props.image.aspectRatio);
									if (newPosterWidth > this.max) {
										newPosterWidth = this.max;
										newPosterHeight = Math.round(newPosterWidth / this.props.image.aspectRatio);
									}
									else if (newPosterWidth < this.min) {
										newPosterWidth = this.min;
										newPosterHeight = Math.round(newPosterWidth / this.props.image.aspectRatio);
									}
									this.setState({
										newPosterHeight,
										newPosterWidth
									});
								}}
								showButtons={false}
							/>
							<span className="unit">px</span>
						</label>
						<label htmlFor="input-image-width">
							<span className="label-left">Width:</span>
							<InputNumeric
								id="input-image-width"
								value={this.state.newPosterWidth}
								decimals={0}
								min={this.min}
								max={this.max}
								onBlur={(w) => {
									let newPosterWidth = w;
									let newPosterHeight = Math.round(newPosterWidth / this.props.image.aspectRatio);
									if (newPosterHeight > this.max) {
										newPosterHeight = this.max;
										newPosterWidth = Math.round(newPosterHeight * this.props.image.aspectRatio);
									}
									else if (newPosterHeight < this.min) {
										newPosterHeight = this.min;
										newPosterWidth = Math.round(newPosterHeight * this.props.image.aspectRatio);
									}
									this.setState({
										newPosterHeight,
										newPosterWidth
									});
								}}
								showButtons={false}
							/>
							<span className="unit">px</span>
						</label>
					</fieldset>
				</div>

				<NavContainer
					disableApply={!this.hasChanged()}
					disableNext={this.props.completedPages[this.props.navPage] === false}
					navigate={this.props.navigate}
					showApply
				/>
			</form>
		);
	}
}


Image.propTypes = {
	// Redux attributes
	completedPages: PropTypes.arrayOf(PropTypes.bool).isRequired,
	image: PropTypes.shape({
		aspectRatio: PropTypes.number.isRequired,
		dataURL: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired
	}).isRequired,
	navPage: PropTypes.number.isRequired,
	posterHeight: PropTypes.number.isRequired,

	// Redux functions
	setCompletedPage: PropTypes.func.isRequired,
	setFontSize: PropTypes.func.isRequired,
	setImage: PropTypes.func.isRequired,
	setPosterHeight: PropTypes.func.isRequired,

	// other props
	navigate: PropTypes.func.isRequired
};
