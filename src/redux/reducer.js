const sampleLyrics = require('./sample-lyrics.js');


export default function reducer(
	// default state
	state = {
		image: {
			aspectRatio: 1.5, // ratio width : height
			dataURL: '', // image file encoded as data URL,
			name: '' // name of selected image file
		},
		poster: {
			dataURL: '', // poster (canvas) encoded as data URL
			height: 3000
		},
		text: {
			fontSize: 18,
			lyrics: sampleLyrics // placeholder lyrics from sample-lyrics.js file
		},
		nav: {
			page: 0 // active navigation page (0: info, 1: image, 2: lyrics, 3: styling, 4: download)
		}
	},
	action
) {
	switch (action.type) {
		// image
		case 'SET_IMAGE': {
			return {
				...state,
				image: {
					...state.newImage,
					aspectRatio: action.payload.aspectRatio,
					dataURL: action.payload.dataURL,
					name: action.payload.name
				}
			};
		}

		// poster
		case 'SET_POSTER_HEIGHT': {
			return {
				...state,
				poster: {
					...state.newImage,
					height: action.payload
				}
			};
		}
		case 'SET_POSTER_URL': {
			return {
				...state,
				poster: {
					...state.poster,
					dataURL: action.payload
				}
			};
		}

		// text
		case 'SET_LYRICS': {
			return {
				...state,
				text: {
					...state.text,
					lyrics: action.payload
				}
			};
		}
		case 'SET_FONT_SIZE': {
			return {
				...state,
				text: {
					...state.text,
					fontSize: action.payload
				}
			};
		}

		// navigation
		case 'NAV_BACK': {
			const newPage = state.nav.page - 1;
			if (newPage < 0) {
				return {
					...state,
					nav: {
						...state.nav,
						page: 0
					}
				};
			}
			else {
				return {
					...state,
					nav: {
						...state.nav,
						page: newPage
					}
				};
			}
		}
		case 'NAV_FORWARD': {
			const newPage = state.nav.page + 1;
			if (newPage > 4) {
				return {
					...state,
					nav: {
						...state.nav,
						page: 4
					}
				};
			}
			else {
				return {
					...state,
					nav: {
						...state.nav,
						page: newPage
					}
				};
			}
		}

		// default
		default: {
			return state;
		}
	}
}