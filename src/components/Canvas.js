import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class Canvas extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.ctx = this.canvas.getContext('2d');

		const imageWidth = this.props.imageHeight * this.props.imageAspectRatio;
		this.drawCanvas(
			this.props.fontSize,
			this.props.imageURL,
			this.props.imageHeight,
			imageWidth,
			this.props.lyrics
		);
	}

	componentDidUpdate() {
		const imageWidth = this.props.imageHeight * this.props.imageAspectRatio;
		this.drawCanvas(
			this.props.fontSize,
			this.props.imageURL,
			this.props.imageHeight,
			imageWidth,
			this.props.lyrics
		);
	}

	drawCanvas(fontSize, imageURL, imageHeight, imageWidth, lyrics) {
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
		this.drawImage(imageURL, imageHeight, imageWidth);

		// draw background behind text
		this.ctx.globalCompositeOperation = 'destination-over';
		this.ctx.fillRect(0, 0, imageWidth, imageHeight);
	}

	drawImage(imageURL, imageHeight, imageWidth) {
		if (imageURL !== '') {
			const img = new Image();
			img.src = imageURL;
			this.ctx.globalCompositeOperation = 'source-in';
			this.ctx.drawImage(img, 0, 0, imageWidth, imageHeight);
		}
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

	render() {
		let displayedHeight;
		let displayedWidth;

		// image orientation: portrait
		if (this.props.imageAspectRatio < 1) {
			displayedHeight = 600;
			displayedWidth = displayedHeight * this.props.imageAspectRatio;
		}
		// image orientation: landscape
		else {
			displayedWidth = 600;
			displayedHeight = displayedWidth / this.props.imageAspectRatio;
		}

		return (
			<div className="canvas-container">
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
					href={this.props.downloadURL}
					onClick={() => this.props.setDownloadURL(this.canvas.toDataURL('image/png')
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
	downloadURL: PropTypes.string.isRequired,
	fontSize: PropTypes.number.isRequired,
	imageURL: PropTypes.string.isRequired,
	imageAspectRatio: PropTypes.number.isRequired,
	imageHeight: PropTypes.number.isRequired,
	lyrics: PropTypes.string.isRequired,

	setDownloadURL: PropTypes.func.isRequired
};