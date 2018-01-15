import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ImageSelectorContainer from '../elements/ImageSelectorContainer';
import NavContainer from '../elements/NavContainer';


export default class Image extends Component {

	constructor(props) {
		super(props);

		// state contains the form values
		this.state = {
			newImageHeight: this.props.imageHeight,
			newImageWidth: this.props.imageHeight * this.props.imageAspectRatio
		};

		// function bindings
		this.updateSettings = this.updateSettings.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		// settings have changed -> update form values
		if (nextProps !== this.props) {
			this.setState({
				newImageHeight: nextProps.imageHeight,
				newImageWidth: nextProps.imageHeight * nextProps.imageAspectRatio
			});
		}
	}

	updateSettings(event) {
		event.preventDefault();

		// update Redux state with form values (if they have changed)
		if (this.state.newImageHeight !== this.props.imageHeight) {
			this.props.setImageHeight(this.state.newImageHeight);
		}
	}

	render() {
		// disable "next" button if no image is selected
		const disableNext = (this.props.imageURL === '');

		return (
			<form onSubmit={this.updateSettings}>
				<div>
					<fieldset>
						<legend>Image</legend>
						<ImageSelectorContainer />
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
										value={Math.round(this.state.newImageHeight)}
										onChange={e => this.setState({ newImageHeight: parseFloat(e.target.value) })}
										onBlur={e => this.setState({
											newImageWidth: parseFloat(e.target.value) * this.props.imageAspectRatio
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
										value={Math.round(this.state.newImageWidth)}
										onChange={e => this.setState({ newImageWidth: parseFloat(e.target.value) })}
										onBlur={e => this.setState({
											newImageHeight: parseFloat(e.target.value) / this.props.imageAspectRatio
										})}
									/>
								</label>
							</li>
						</ul>
					</fieldset>
				</div>

				<NavContainer disableNext={disableNext} showApply />
			</form>
		);
	}
}


Image.propTypes = {
	// Redux attributes
	imageAspectRatio: PropTypes.number.isRequired,
	imageHeight: PropTypes.number.isRequired,
	imageURL: PropTypes.string.isRequired,

	// Redux functions
	setImageHeight: PropTypes.func.isRequired
};