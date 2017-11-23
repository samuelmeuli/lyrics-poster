export function setFontSize(newFontSize) {
	return {
		type: 'SET_FONT_SIZE',
		payload: newFontSize
	};
}

export function setImage(newImageAspectRatio, newImageURL) {
	return {
		type: 'SET_IMAGE',
		payload: {
			imageAspectRatio: newImageAspectRatio,
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

export function setLyrics(newLyrics) {
	return {
		type: 'SET_LYRICS',
		payload: newLyrics
	};
}