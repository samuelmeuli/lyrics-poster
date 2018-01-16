import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ImageSelector from '../elements/ImageSelector';
import NavContainer from '../elements/NavContainer';


export default class Image extends Component {

	constructor(props) {
		super(props);

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

	handleImageChange(aspectRatio, dataURL, name) {
		this.setState({
			newImage: {
				aspectRatio,
				dataURL,
				name
			}
		});
	}

	updateSettings(event) {
		event.preventDefault();

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
	}

	render() {
		// disable "next" button if no image is selected
		const disableNext = (this.props.image.dataURL === '');

		return (
			<form onSubmit={this.updateSettings}>
				<div>
					<fieldset>
						<legend>Image</legend>
						<ImageSelector
							newImageName={this.state.newImage.name}
							onImageChange={this.handleImageChange}
						/>
					</fieldset>

					<fieldset>
						<legend>Image size</legend>
						<ul>
							<li>
								<label htmlFor="input-image-height">
									Height:
									<input
										type="number"
										id="input-image-height"
										value={Math.round(this.state.newPosterHeight)}
										onChange={e => this.setState({ newPosterHeight: parseFloat(e.target.value) })}
										onBlur={e => this.setState({
											newPosterWidth: parseFloat(e.target.value) * this.props.image.aspectRatio
										})}
									/>
								</label>
							</li>

							<li>
								<label htmlFor="input-image-width">
									Width:
									<input
										type="number"
										id="input-image-width"
										value={Math.round(this.state.newPosterWidth)}
										onChange={e => this.setState({ newPosterWidth: parseFloat(e.target.value) })}
										onBlur={e => this.setState({
											newPosterHeight: parseFloat(e.target.value) / this.props.image.aspectRatio
										})}
									/>
								</label>
							</li>
						</ul>
					</fieldset>
				</div>

				<NavContainer	disableNext={disableNext}	showApply	/>
			</form>
		);
	}
}


Image.propTypes = {
	// Redux attributes
	image: PropTypes.shape({
		aspectRatio: PropTypes.number.isRequired,
		dataURL: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired
	}).isRequired,
	posterHeight: PropTypes.number.isRequired,

	// Redux functions
	setImage: PropTypes.func.isRequired,
	setPosterHeight: PropTypes.func.isRequired
};