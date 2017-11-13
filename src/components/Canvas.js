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

		this.drawCanvas(
			this.props.fontSize,
			this.props.imageHeight,
			this.props.imageWidth,
			this.props.lyrics
		);
	}

	componentDidUpdate() {
		this.drawCanvas(
			this.props.fontSize,
			this.props.imageHeight,
			this.props.imageWidth,
			this.props.lyrics
		);
	}

	drawCanvas(fontSize, imageHeight, imageWidth, lyrics) {
		this.canvas.height = imageHeight;
		this.canvas.width = imageWidth;
		this.ctx.fillStyle = 'white';

		// clear canvas
		this.ctx.clearRect(0, 0, imageWidth, imageHeight);
		this.ctx.save();

		// format and draw text
		this.ctx.font = `${fontSize}px Verdana`;
		this.ctx.shadowOffsetX = 1;
		this.ctx.shadowOffsetY = 1;
		this.ctx.shadowColor = 'black';
		this.ctx.shadowBlur = 1;
		this.drawText(fontSize, imageHeight, imageWidth, lyrics);
		this.ctx.restore();

		// draw image
		if (this.state.image) {
			this.ctx.globalCompositeOperation = 'source-in';
			this.ctx.drawImage(this.state.image, 0, 0);
		}

		// draw background behind text
		this.ctx.globalCompositeOperation = 'destination-over';
		this.ctx.fillRect(0, 0, imageWidth, imageHeight);
	}

	drawText(fontSize, imageHeight, imageWidth, lyrics) {
		// replace line breaks with slashes
		const lyricsFormatted = lyrics.replace(/(?:\r\n|\r|\n)/g, ' / ');
		let lyricsPosition = 0;

		// write lines to canvas until canvas height is reached
		let lineNr = 0;
		while (lineNr * fontSize < imageHeight) {
			lineNr += 1;
			let line = '';
			// new line: skip leading spaces, slashes, commas and dots
			while ((/ |\/|\.|,/).test(lyricsFormatted.charAt(lyricsPosition % lyricsFormatted.length))) {
				lyricsPosition += 1;
			}
			// add characters to line until canvas width is reached
			while (this.ctx.measureText(line).width < imageWidth) {
				line += lyricsFormatted.charAt(lyricsPosition % lyricsFormatted.length);
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
				this.props.setImageHeight(newImage.height);
				this.props.setImageWidth(newImage.width);
			};
			newImage.src = event.target.result;
		};
		reader.readAsDataURL(e.target.files[0]);
	}

	render() {
		let displayedHeight;
		let displayedWidth;

		if (this.props.imageWidth > this.props.imageHeight) {
			displayedWidth = 750;
			displayedHeight = displayedWidth / (this.props.imageWidth / this.props.imageHeight);
		}
		else {
			displayedHeight = 750;
			displayedWidth = displayedHeight / (this.props.imageHeight / this.props.imageWidth);
		}

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
					style={{
						height: `${displayedHeight}px`,
						width: `${displayedWidth}px`
					}}
					ref={(c) => {
						this.canvas = c;
					}}
				/>
				<a
					download="lyrics-poster.png"
					href={this.props.downloadUrl}
					onClick={() => this.props.setDownloadUrl(this.canvas.toDataURL('image/png')
						.replace(/^data:image\/[^;]/, 'data:application/octet-stream'))
					}
				>
					Download image
				</a>
			</div>
		);
	}
}

Canvas.propTypes = {
	setDownloadUrl: PropTypes.func.isRequired,
	setImageHeight: PropTypes.func.isRequired,
	setImageWidth: PropTypes.func.isRequired,

	downloadUrl: PropTypes.string.isRequired,
	fontSize: PropTypes.number.isRequired,
	imageHeight: PropTypes.number.isRequired,
	imageWidth: PropTypes.number.isRequired,
	lyrics: PropTypes.string.isRequired
};