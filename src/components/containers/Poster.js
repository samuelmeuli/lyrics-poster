import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FileSaver from 'file-saver';


export default class Preview extends Component {

	componentDidMount() {
		// get reference to canvas HTML element
		this.ctx = this.canvas.getContext('2d');

		// draw poster preview on canvas
		const imageWidth = this.props.imageHeight * this.props.imageAspectRatio;
		this.drawPoster(
			this.props.fontSize,
			this.props.imageURL,
			this.props.imageHeight,
			imageWidth,
			this.props.lyrics
		);
	}

	componentDidUpdate() {
		// draw poster preview on canvas
		const imageWidth = this.props.imageHeight * this.props.imageAspectRatio;
		this.drawPoster(
			this.props.fontSize,
			this.props.imageURL,
			this.props.imageHeight,
			imageWidth,
			this.props.lyrics
		);
	}

	drawPoster(fontSize, imageURL, imageHeight, imageWidth, lyrics) {
		// set canvas size
		this.canvas.height = imageHeight;
		this.canvas.width = imageWidth;

		// clear canvas
		this.ctx.clearRect(0, 0, imageWidth, imageHeight);
		this.ctx.fillStyle = 'white';
		this.ctx.save();

		// format and draw text
		const formattedLyrics = this.formatText(lyrics);
		this.ctx.font = `${fontSize}px Verdana`;
		this.ctx.shadowOffsetX = 1;
		this.ctx.shadowOffsetY = 1;
		this.ctx.shadowColor = 'black';
		this.ctx.shadowBlur = 1;
		this.drawText(fontSize, imageHeight, imageWidth, formattedLyrics);
		this.ctx.restore();

		// draw image (only where text is)
		this.ctx.globalCompositeOperation = 'source-in';
		this.drawImage(imageURL, imageHeight, imageWidth);

		// draw white background behind text
		this.ctx.globalCompositeOperation = 'destination-over';
		this.ctx.fillRect(0, 0, imageWidth, imageHeight);
	}

	formatText(lyrics) {
		// replace line breaks with slashes
		let lyricsFormatted = lyrics.replace(/(?:\r\n|\r|\n)+/g, ' / ');

		// place slash after last line if it does not exist yet
		if (!lyricsFormatted.endsWith(' / ')) {
			lyricsFormatted += ' / ';
		}

		return lyricsFormatted;
	}

	drawText(fontSize, imageHeight, imageWidth, lyricsFormatted) {
		let charNr = 0;
		let lineNr = 0;

		// write lines to canvas until canvas height is reached
		while (lineNr * fontSize < imageHeight) {
			lineNr += 1;
			let line = '';

			// new line: skip leading spaces, slashes, dots, and commas
			while ((/ |\/|\.|,/).test(lyricsFormatted.charAt(charNr % lyricsFormatted.length))) {
				charNr += 1;
			}

			// add characters to line until canvas width is reached
			while (this.ctx.measureText(line).width < imageWidth) {
				line += lyricsFormatted.charAt(charNr % lyricsFormatted.length);
				charNr += 1;
			}

			// write line to canvas below the previous line
			this.ctx.fillText(line, 0, lineNr * fontSize);
		}
	}

	drawImage(imageURL, imageHeight, imageWidth) {
		if (imageURL !== '') {
			const img = new Image();
			img.src = imageURL;
			this.ctx.drawImage(img, 0, 0, imageWidth, imageHeight);
		}
	}

	downloadPoster() {
		// get canvas as Blob and download it using FileSaver.js
		this.canvas.toBlob((blob) => {
			FileSaver.saveAs(blob, 'lyrics-poster');
		});
	}

	render() {
		// scale poster to fit screen size
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
				<button id="download-button" onClick={() => this.downloadPoster()}>
					Download image
				</button>
			</div>
		);
	}
}

Preview.propTypes = {
	fontSize: PropTypes.number.isRequired,
	imageURL: PropTypes.string.isRequired,
	imageAspectRatio: PropTypes.number.isRequired,
	imageHeight: PropTypes.number.isRequired,
	lyrics: PropTypes.string.isRequired
};