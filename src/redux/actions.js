export function setDownloadUrl(newDownloadUrl) {
	return {
		type: 'SET_DOWNLOAD_URL',
		payload: newDownloadUrl
	};
}

export function setFontSize(newFontSize) {
	return {
		type: 'SET_FONT_SIZE',
		payload: newFontSize
	};
}

export function setImageAspectRatio(newImageAspectRatio) {
	return {
		type: 'SET_IMAGE_ASPECT_RATIO',
		payload: newImageAspectRatio
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