import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class Canvas extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.ctx = this.canvas.getContext('2d');
		this.imageLoader.addEventListener('change', this.handleImageChange.bind(this), false);

		this.drawCanvas();
	}

	componentDidUpdate() {
		this.drawCanvas();
	}

	drawCanvas() {
		this.canvas.height = this.props.imageHeight;
		this.canvas.width = this.props.imageWidth;

		// clear canvas
		this.ctx.clearRect(0, 0, this.props.imageWidth, this.props.imageHeight);

		// draw text
		this.ctx.beginPath();
		this.ctx.font = `${this.props.fontSize}px Verdana`;
		this.formatText(
			this.props.lyrics,
			this.props.imageHeight,
			this.props.imageWidth,
			this.props.fontSize
		);

		// draw image
		if (this.state.image) {
			this.ctx.beginPath();
			this.ctx.globalCompositeOperation = 'source-in';
			this.ctx.drawImage(this.state.image, 0, 0);
		}
	}

	formatText(text, canvasHeight, canvasWidth, fontSize) {
		// replace line breaks with slashes
		const lyrics = text.replace(/(?:\r\n|\r|\n)/g, ' / ');
		let lyricsPosition = 0;

		// write lines to canvas until canvas height is reached
		let lineNr = 0;
		while (lineNr * fontSize < canvasHeight) {
			lineNr += 1;
			let line = '';
			// new line: skip leading spaces, slashes, commas and dots
			while ((/ |\/|\.|,/).test(lyrics.charAt(lyricsPosition % lyrics.length))) {
				lyricsPosition += 1;
			}
			// add characters to line until canvas width is reached
			while (this.ctx.measureText(line).width < canvasWidth) {
				line += lyrics.charAt(lyricsPosition % lyrics.length);
				lyricsPosition += 1;
			}
			// write line to canvas
			this.ctx.fillText(line, 0, lineNr * fontSize);
		}
	}

	handleImageChange(e) {
		// set up FileReader for image
		const reader = new FileReader();

		// when image is loaded, save it to state
		reader.onload = (event) => {
			const newImage = new Image();
			newImage.onload = () => {
				this.setState({ image: newImage });
			};
			newImage.src = event.target.result;
		};
		reader.readAsDataURL(e.target.files[0]);
	}

	render() {
		return (
			<div className="canvas-container">
				<input
					type="file"
					name="imageLoader"
					ref={(i) => {
						this.imageLoader = i;
					}}
				/>
				<canvas
					ref={(c) => {
						this.canvas = c;
					}}
				/>
			</div>
		);
	}
}

Canvas.propTypes = {
	imageHeight: PropTypes.number.isRequired,
	imageWidth: PropTypes.number.isRequired,
	fontSize: PropTypes.number.isRequired,
	lyrics: PropTypes.string.isRequired
};