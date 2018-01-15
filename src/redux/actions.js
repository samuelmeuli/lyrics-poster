// image

export function setImage(newImageURL, newImageAspectRatio, newImageName) {
	return {
		type: 'SET_IMAGE',
		payload: {
			imageAspectRatio: newImageAspectRatio,
			imageName: newImageName,
			imageURL: newImageURL
		}
	};
}

export function setImageHeight(newImageHeight) {
	return {
		type: 'SET_IMAGE_HEIGHT',
		payload: newImageHeight
	};
}

export function setPosterURL(newPosterURL) {
	return {
		type: 'SET_POSTER_URL',
		payload: newPosterURL
	};
}

// text

export function setFontSize(newFontSize) {
	return {
		type: 'SET_FONT_SIZE',
		payload: newFontSize
	};
}

export function setLyrics(newLyrics) {
	return {
		type: 'SET_LYRICS',
		payload: newLyrics
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