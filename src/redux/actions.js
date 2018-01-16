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

export function setFontSize(fontSize) {
	return {
		type: 'SET_FONT_SIZE',
		payload: fontSize
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