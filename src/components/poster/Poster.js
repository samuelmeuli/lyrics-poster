import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class Poster extends Component {

	constructor(props) {
		super(props);

		this.state = {
			posterWidthScaled: this.calcScaledWidth()
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
		if (newScaledWidth !== this.state.posterWidthScaled) {
			this.setState({
				posterWidthScaled: newScaledWidth
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
				posterWidthScaled: this.calcScaledWidth()
			});
		}, 100);
	}

	calcScaledWidth() {
		const screenWidth = window.innerWidth;

		if (screenWidth <= 1000) {
			return '100%';
		}
		else {
			const posterWidth = this.props.posterHeight * this.props.image.aspectRatio;
			const margin = '40';
			const screenHeight = window.innerHeight;
			const settingsWidth = '450';

			const heightScaled = (screenHeight - (2 * margin)) / this.props.posterHeight;
			const widthScaled = (screenWidth - settingsWidth - (3 * margin)) / posterWidth;
			if (heightScaled < widthScaled) {
				return posterWidth * heightScaled;
			}
			else {
				return posterWidth * widthScaled;
			}
		}
	}

	async drawPoster() {
		const posterWidth = this.props.posterHeight * this.props.image.aspectRatio;

		// set canvas size
		this.ctx.globalCompositeOperation = 'source-over';
		this.canvas.height = this.props.posterHeight;
		this.canvas.width = posterWidth;

		// clear canvas
		this.ctx.clearRect(0, 0, posterWidth, this.props.posterHeight);
		this.ctx.save();

		// format and draw text
		const formattedLyrics = this.formatText(this.props.text.lyrics);
		this.ctx.font = `${this.props.text.fontSize}px Verdana`;
		this.ctx.shadowOffsetX = 1;
		this.ctx.shadowOffsetY = 1;
		this.ctx.shadowColor = 'black';
		this.ctx.shadowBlur = 1;
		this.drawText(this.props.text.fontSize, this.props.posterHeight, posterWidth, formattedLyrics);
		this.ctx.restore();

		// draw image (only where text is)
		this.ctx.globalCompositeOperation = 'source-in';
		await this.drawImage(this.props.image.dataURL, this.props.posterHeight, posterWidth);

		// draw white background behind text
		this.ctx.globalCompositeOperation = 'destination-over';
		this.ctx.fillStyle = 'white';
		this.ctx.fillRect(0, 0, posterWidth, this.props.posterHeight);

		// save poster as data URL to Redux store
		this.props.setPosterURL(this.canvas.toDataURL());
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

	drawText(fontSize, posterHeight, posterWidth, lyricsFormatted) {
		let charNr = 0;
		let lineNr = 0;

		// write lines to canvas until canvas height is reached
		while (lineNr * fontSize < posterHeight) {
			lineNr += 1;
			let line = '';

			// new line: skip leading spaces, slashes, dots, and commas
			while ((/ |\/|\.|,/).test(lyricsFormatted.charAt(charNr % lyricsFormatted.length))) {
				charNr += 1;
			}

			// add characters to line until canvas width is reached
			while (this.ctx.measureText(line).width < posterWidth) {
				line += lyricsFormatted.charAt(charNr % lyricsFormatted.length);
				charNr += 1;
			}

			// write line to canvas below the previous line
			this.ctx.fillText(line, 0, lineNr * fontSize);
		}
	}

	drawImage(dataURL, posterHeight, posterWidth) {
		return new Promise((resolve, reject) => {
			if (dataURL !== '') {
				const img = new Image();
				img.onload = () => {
					this.ctx.drawImage(img, 0, 0, posterWidth, posterHeight);
					return resolve();
				};
				img.onerror = reject;
				img.src = dataURL;
			}
			else {
				return resolve();
			}
		});
	}

	render() {
		return (
			<div className="poster-container">
				<canvas
					ref={(c) => {
						this.canvas = c;
					}}
					style={{ width: this.state.posterWidthScaled }}
				/>
			</div>
		);
	}
}


Poster.propTypes = {
	// Redux attributes
	image: PropTypes.shape({
		aspectRatio: PropTypes.number.isRequired,
		dataURL: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired
	}).isRequired,
	posterHeight: PropTypes.number.isRequired,
	text: PropTypes.shape({
		fontSize: PropTypes.number.isRequired,
		lyrics: PropTypes.string.isRequired
	}).isRequired,

	// Redux functions
	setPosterURL: PropTypes.func.isRequired
};