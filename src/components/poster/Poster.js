import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class Poster extends Component {

	constructor(props) {
		super(props);

		this.state = {
			screenHeight: window.innerHeight,
			screenWidth: window.innerWidth
		};

		// function bindings
		this.onWindowResize = this.onWindowResize.bind(this);

		// window resize event listener
		window.addEventListener('resize', this.onWindowResize);
	}

	componentDidMount() {
		// get reference to canvas HTML element
		this.ctx = this.canvas.getContext('2d');

		// draw canvas for the first time (this.ctx has been initialized)
		this.drawPoster();
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.onWindowResize);
	}

	onWindowResize() {
		clearTimeout(this.resizeTimeout);
		this.resizeTimeout = setTimeout(() => {
			const newScreenWidth = window.innerWidth;
			const newScreenHeight = window.innerHeight;
			if (newScreenWidth !== this.state.screenWidth ||
					newScreenHeight !== this.state.screenHeight) {
				this.setState({
					screenHeight: newScreenHeight,
					screenWidth: newScreenWidth
				});
			}
		}, 100);
	}

	calcScaledWidth() {
		if (this.state.screenWidth <= 1000) {
			return '100%';
		}
		else {
			const posterWidth = this.props.posterHeight * this.props.image.aspectRatio;
			const margin = '40';
			const settingsWidth = '440';

			const heightScaled = (this.state.screenHeight - (2 * margin)) / this.props.posterHeight;
			const widthScaled = (this.state.screenWidth - settingsWidth - (3 * margin)) / posterWidth;
			if (heightScaled < widthScaled) {
				return posterWidth * heightScaled;
			}
			else {
				return posterWidth * widthScaled;
			}
		}
	}

	async drawPoster() {
		const { aspectRatio, dataURL } = this.props.image;
		const { posterBackground, posterHeight } = this.props;
		const { fontFamily, fontSize, lineHeight, lyrics } = this.props.text;

		const posterWidth = posterHeight * aspectRatio;
		const formattedLyrics = this.formatText(lyrics);

		// set canvas size
		this.ctx.globalCompositeOperation = 'source-over';
		this.canvas.height = posterHeight;
		this.canvas.width = posterWidth;

		// clear canvas
		this.ctx.clearRect(0, 0, posterWidth, posterHeight);

		// draw text
		this.ctx.font = `900 ${fontSize}px ${fontFamily}`;
		this.drawText(fontSize, lineHeight, posterHeight, posterWidth, formattedLyrics);

		// apply brightness/contrast filters
		this.ctx.save();
		this.ctx.filter = `brightness(${this.props.posterBrightness}%) contrast(${this.props.posterContrast}%)`;

		// draw image (only where text is)
		this.ctx.globalCompositeOperation = 'source-in';
		await this.drawImage(dataURL, posterHeight, posterWidth);
		this.ctx.restore();

		// draw shadow behind text if background should be white
		if (posterBackground === 'white') {
			this.ctx.save();
			this.ctx.globalCompositeOperation = 'destination-over';
			this.ctx.shadowColor = 'rgba(0, 0, 0, .25)';
			this.ctx.shadowOffsetX = 1;
			this.ctx.shadowOffsetY = 1;
			this.ctx.shadowBlur = 5;
			this.ctx.fillStyle = 'black';
			this.drawText(fontSize, lineHeight, posterHeight, posterWidth, formattedLyrics);
			this.ctx.restore();
		}

		// draw background behind text
		this.ctx.globalCompositeOperation = 'destination-over';
		this.ctx.fillStyle = posterBackground;
		this.ctx.fillRect(0, 0, posterWidth, posterHeight);

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

	drawText(fontSize, lineHeight, posterHeight, posterWidth, lyricsFormatted) {
		let charNr = 0;
		let lineNr = 0;

		// write lines to canvas until canvas height is reached
		while (lineNr * lineHeight * fontSize < posterHeight) {
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
			this.ctx.fillText(line, 0, lineNr * lineHeight * fontSize);
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
		// draw poster (except on initial render, because canvas has not been initialized yet)
		if (this.ctx) {
			this.drawPoster();
		}

		return (
			<div className="poster-container">
				<canvas
					ref={(c) => {
						this.canvas = c;
					}}
					style={{ width: this.calcScaledWidth() }}
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
	posterBackground: PropTypes.string.isRequired,
	posterBrightness: PropTypes.number.isRequired,
	posterContrast: PropTypes.number.isRequired,
	posterHeight: PropTypes.number.isRequired,
	text: PropTypes.shape({
		fontFamily: PropTypes.string.isRequired,
		fontSize: PropTypes.number.isRequired,
		lineHeight: PropTypes.number.isRequired,
		lyrics: PropTypes.string.isRequired
	}).isRequired,

	// Redux functions
	setPosterURL: PropTypes.func.isRequired
};