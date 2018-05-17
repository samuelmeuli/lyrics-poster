import { Component } from 'react';
import PropTypes from 'prop-types';

import sampleLyrics from '../../../sample-lyrics';


export default class PosterGenerator extends Component {

	componentDidUpdate() {
		this.props.setIsLoading(true);
		this.generatePoster()
			.then(() => {
				this.props.setIsLoading(false);
			});
	}

	async generatePoster() {
		const { posterBackground, posterBrightness, posterContrast, posterHeight } = this.props;
		const { aspectRatio, dataURL } = this.props.image;
		const { fontFamily, fontSize, lineHeight, separator } = this.props.text;
		const lyrics = this.props.text.lyrics || sampleLyrics;

		const posterWidth = posterHeight * aspectRatio;
		const formattedLyrics = this.formatText(lyrics, separator);

		// initialize canvas
		const canvas = document.createElement('canvas');
		canvas.height = posterHeight;
		canvas.width = posterWidth;
		const ctx = canvas.getContext('2d');
		ctx.globalCompositeOperation = 'source-over';

		// clear canvas
		ctx.clearRect(0, 0, posterWidth, posterHeight);

		// draw text
		ctx.font = `900 ${fontSize}px ${fontFamily}`;
		this.drawText(ctx, fontSize, lineHeight, posterHeight, posterWidth, formattedLyrics);

		// apply brightness/contrast filters
		ctx.save();
		ctx.filter = `brightness(${posterBrightness}%) contrast(${posterContrast}%)`;

		// draw image (only where text is)
		ctx.globalCompositeOperation = 'source-in';
		await this.drawImage(ctx, dataURL, posterHeight, posterWidth);
		ctx.restore();

		// draw shadow behind text if background should be white
		if (posterBackground === 'white') {
			ctx.save();
			ctx.globalCompositeOperation = 'destination-over';
			ctx.shadowColor = 'rgba(0, 0, 0, .25)';
			ctx.shadowOffsetX = 1;
			ctx.shadowOffsetY = 1;
			ctx.shadowBlur = 5;
			ctx.fillStyle = 'black';
			this.drawText(ctx, fontSize, lineHeight, posterHeight, posterWidth, formattedLyrics);
			ctx.restore();
		}

		// draw background behind text
		ctx.globalCompositeOperation = 'destination-over';
		ctx.fillStyle = posterBackground;
		ctx.fillRect(0, 0, posterWidth, posterHeight);

		// save poster as data URL to Redux store
		this.props.setPosterURL(canvas.toDataURL());
	}

	formatText(lyrics, separator) {
		// replace line breaks with specified separator
		let lyricsFormatted = lyrics.replace(/(?:\r\n|\r|\n)+/g, separator);

		// place separator after last line of lyrics if it does not exist yet
		if (!lyricsFormatted.endsWith(separator)) {
			lyricsFormatted += separator;
		}

		return lyricsFormatted;
	}

	drawText(ctx, fontSize, lineHeight, posterHeight, posterWidth, lyricsFormatted) {
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
			while (ctx.measureText(line).width < posterWidth) {
				line += lyricsFormatted.charAt(charNr % lyricsFormatted.length);
				charNr += 1;
			}

			// write line to canvas below the previous line
			ctx.fillText(line, 0, lineNr * lineHeight * fontSize);
		}
	}

	drawImage(ctx, dataURL, posterHeight, posterWidth) {
		return new Promise((resolve, reject) => {
			if (dataURL !== '') {
				const img = new Image();
				img.onload = () => {
					ctx.drawImage(img, 0, 0, posterWidth, posterHeight);
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
		return null;
	}
}


PosterGenerator.propTypes = {
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
	setIsLoading: PropTypes.func.isRequired,
	setPosterURL: PropTypes.func.isRequired
};