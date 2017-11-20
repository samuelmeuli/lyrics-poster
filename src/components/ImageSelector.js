import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class ImageSelector extends Component {

	componentDidMount() {
		this.imageLoader.addEventListener('change', this.handleImageChange.bind(this), false);
	}

	handleImageChange(e) {
		// set up FileReader for image
		const reader = new FileReader();

		// when image is loaded, save it to state
		reader.onload = (event) => {
			const imageURL = event.target.result;
			const newImage = new Image();
			newImage.src = imageURL;
			newImage.onload = () => {
				this.props.setImage(newImage.width / newImage.height, imageURL);
			};
		};
		reader.readAsDataURL(e.target.files[0]);
	}

	render() {
		return (
			<label htmlFor="image-selector">
				Select image
				<input
					type="file"
					id="image-selector"
					ref={(i) => {
						this.imageLoader = i;
					}}
				/>
			</label>
		);
	}
}

ImageSelector.propTypes = {
	setImage: PropTypes.func.isRequired
};