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

export function setBrightness(brightness) {
	if (brightness >= 0 && brightness <= 200) {
		return {
			type: 'SET_POSTER_BRIGHTNESS',
			payload: brightness
		};
	}
	else {
		throw Error('Brightness value must be between 0 and 200');
	}
}

export function setContrast(contrast) {
	if (contrast >= 0 && contrast <= 200) {
		return {
			type: 'SET_POSTER_CONTRAST',
			payload: contrast
		};
	}
	else {
		throw Error('Contrast value must be between 0 and 200');
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

export function setIsLoading(isLoading) {
	return {
		type: 'SET_POSTER_IS_LOADING',
		payload: isLoading
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

export function setSeparator(separator) {
	if (separator === ' ' || separator === ' / ' || separator === ', ') {
		return {
			type: 'SET_SEPARATOR',
			payload: separator
		};
	}
	else {
		throw Error('Error changing text separator: new value is not one of the allowed values');
	}
}


// navigation

export function setNavPage(navPage) {
	return {
		type: 'SET_NAV_PAGE',
		payload: navPage
	};
}

export function setCompletedPage(navPage, isCompleted) {
	return {
		type: 'SET_COMPLETED_PAGE',
		payload: {
			navPage,
			isCompleted
		}
	};
}
