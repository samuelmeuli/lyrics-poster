import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class ImageSelector extends Component {

	constructor(props) {
		super(props);

		this.state = {
			formatError: false
		};
	}

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

		// check if selected file is an image with a supported file extension
		const fileExtension = e.target.files[0].name.split('.').pop().toLowerCase();
		if (!['gif', 'jpg', 'jpeg', 'png'].includes(fileExtension)) {
			// remove selected file if its type is not supported
			this.imageLoader.value = '';
			this.setState({ formatError: true });
		}
		else {
			// get image's data URL (will then be saved to state)
			reader.readAsDataURL(e.target.files[0]);
			this.setState({ formatError: false });
		}
	}

	render() {
		return (
			<label htmlFor="image-selector">
				Select image
				<input
					type="file"
					accept=".png, .jpg, .jpeg, .gif"
					id="image-selector"
					ref={(i) => {
						this.imageLoader = i;
					}}
				/>
				{
					this.state.formatError &&
					<p className="text-warning">This file format is not supported.</p>
				}
			</label>
		);
	}
}

ImageSelector.propTypes = {
	setImage: PropTypes.func.isRequired
};