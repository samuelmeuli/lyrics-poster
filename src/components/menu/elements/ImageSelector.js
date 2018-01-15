import React, { Component } from 'react';
import PropTypes from 'prop-types';

import iconError from '../../../images/icons/error.svg';


export default class ImageSelector extends Component {

	constructor(props) {
		super(props);

		this.state = {
			fileTypeError: false
		};

		// function bindings
		this.handleImageChange = this.handleImageChange.bind(this);
	}

	componentDidMount() {
		this.imageLoader.addEventListener('change', this.handleImageChange, false);
	}

	handleImageChange(e) {
		// set up FileReader for image
		const reader = new FileReader();
		let fileName;

		// when image is loaded, save it to state
		reader.onload = (event) => {
			const imageURL = event.target.result;
			const newImage = new Image();
			newImage.src = imageURL;
			newImage.onload = () => {
				this.props.setImage(imageURL, newImage.width / newImage.height, fileName);
			};
		};

		// check if selected file is an image with a supported file extension
		if (e.target.files[0]) {
			fileName = e.target.files[0].name;
			const fileExtension = fileName.split('.').pop().toLowerCase();
			if (!['gif', 'jpg', 'jpeg', 'png'].includes(fileExtension)) {
				// if file type is not supported: remove file and display error
				this.imageLoader.value = '';
				this.setState({ fileTypeError: true });
			}
			else {
				// get image's data URL (will then be saved to state)
				reader.readAsDataURL(e.target.files[0]);
				this.setState({ fileTypeError: false });
			}
		}
	}

	render() {
		return (
			<div className="image-selector-container">
				<label htmlFor="image-selector" id="image-selector-label">
					Select image
					<input
						type="file"
						accept=".png, .jpg, .jpeg, .gif"
						id="image-selector"
						ref={(i) => {
							this.imageLoader = i;
						}}
					/>
				</label>
				{
					this.state.fileTypeError ?
						<p className="error-wrapper">
							<img src={iconError} alt="Error: " width="18px" />
							Invalid file format
						</p> :
						<p>{this.props.imageName !== '' ? this.props.imageName : 'No file selected'}</p>
				}
			</div>
		);
	}
}


ImageSelector.propTypes = {
	// Redux attributes
	imageName: PropTypes.string.isRequired,

	// Redux functions
	setImage: PropTypes.func.isRequired
};