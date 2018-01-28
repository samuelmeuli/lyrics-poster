// image

export function setImage(aspectRatio, dataURL, name) {
	return {
		type: 'SET_IMAGE',
		payload: {
			aspectRatio,
			dataURL,
			name
		}
	};
}


// poster

export function setBackgroundColor(backgroundColor) {
	if (backgroundColor === 'white' || backgroundColor === 'black') {
		return {
			type: 'SET_POSTER_BACKGROUND',
			payload: backgroundColor
		};
	}
	else {
		throw Error('Error changing poster background: must either be white or black');
	}
}

export function setPosterURL(dataURL) {
	return {
		type: 'SET_POSTER_URL',
		payload: dataURL
	};
}

export function setPosterHeight(height) {
	return {
		type: 'SET_POSTER_HEIGHT',
		payload: height
	};
}


// text

export function setFontFamily(fontFamily) {
	return {
		type: 'SET_FONT_FAMILY',
		payload: fontFamily
	};
}

export function setFontSize(fontSize) {
	return {
		type: 'SET_FONT_SIZE',
		payload: fontSize
	};
}

export function setLineHeight(lineHeight) {
	return {
		type: 'SET_LINE_HEIGHT',
		payload: lineHeight
	};
}

export function setLyrics(lyrics) {
	return {
		type: 'SET_LYRICS',
		payload: lyrics
	};
}


// navigation

export function navBack() {
	return {
		type: 'NAV_BACK'
	};
}

export function navForward() {
	return {
		type: 'NAV_FORWARD'
	};
}