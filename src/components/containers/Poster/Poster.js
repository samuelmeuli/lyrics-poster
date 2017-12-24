import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FileSaver from 'file-saver';


export default class Preview extends Component {

	constructor(props) {
		super(props);

		this.state = {
			imageWidthScaled: this.calcScaledWidth()
		};

		// function bindings
		this.onWindowResize = this.onWindowResize.bind(this);

		// window resize event listener
		window.addEventListener('resize', this.onWindowResize);
	}

	componentDidMount() {
		// get reference to canvas HTML element
		this.ctx = this.canvas.getContext('2d');

		this.drawPoster();
	}

	componentDidUpdate() {
		this.drawPoster();

		const newScaledWidth = this.calcScaledWidth();
		if (newScaledWidth !== this.state.imageWidthScaled) {
			this.setState({
				imageWidthScaled: newScaledWidth
			});
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.onWindowResize);
	}

	onWindowResize() {
		clearTimeout(this.resizeTimeout);
		this.resizeTimeout = setTimeout(() => {
			this.setState({
				imageWidthScaled: this.calcScaledWidth()
			});
		}, 100);
	}

	calcScaledWidth() {
		const screenWidth = window.innerWidth;

		if (screenWidth <= 1000) {
			return '100%';
		}
		else {
			const imageWidth = this.props.imageHeight * this.props.imageAspectRatio;
			const margin = '40';
			const screenHeight = window.innerHeight;
			const settingsWidth = '450';

			const scaleHeight = (screenHeight - (2 * margin)) / this.props.imageHeight;
			const scaleWidth = (screenWidth - settingsWidth - (3 * margin)) / imageWidth;
			if (scaleHeight < scaleWidth) {
				return imageWidth * scaleHeight;
			}
			else {
				return imageWidth * scaleWidth;
			}
		}
	}

	async drawPoster() {
		const { fontSize, imageAspectRatio, imageHeight, imageURL, lyrics } = this.props;
		const imageWidth = imageHeight * imageAspectRatio;

		// set canvas size
		this.ctx.globalCompositeOperation = 'source-over';
		this.canvas.height = imageHeight;
		this.canvas.width = imageWidth;

		// clear canvas
		this.ctx.clearRect(0, 0, imageWidth, imageHeight);
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
		await this.drawImage(imageURL, imageHeight, imageWidth);

		// draw white background behind text
		this.ctx.globalCompositeOperation = 'destination-over';
		this.ctx.fillStyle = 'white';
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
		return new Promise((resolve, reject) => {
			if (imageURL !== '') {
				const img = new Image();
				img.onload = () => {
					this.ctx.drawImage(img, 0, 0, imageWidth, imageHeight);
					return resolve();
				};
				img.onerror = reject;
				img.src = imageURL;
			}
			else {
				return resolve();
			}
		});
	}

	downloadPoster() {
		// get canvas as Blob and download it using FileSaver.js
		this.canvas.toBlob((blob) => {
			FileSaver.saveAs(blob, 'lyrics-poster');
		});
	}

	render() {
		return (
			<div className="container-poster">
				<canvas
					ref={(c) => {
						this.canvas = c;
					}}
					style={{ width: this.state.imageWidthScaled }}
				/>
				<input
					type="button"
					value="Download poster"
					id="download-button"
					onClick={() => this.downloadPoster()}
				/>
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