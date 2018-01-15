const sampleLyrics = require('./sample-lyrics.js');


export default function reducer(
	// default state
	state = {
		// image options
		imageAspectRatio: 1.5, // ratio width : height
		imageHeight: 3000,
		imageName: '', // name of selected image file
		imageURL: '', // image file encoded as data URL
		posterURL: '', // poster (canvas) encoded as data URL

		// text options
		lyrics: sampleLyrics, // placeholder lyrics from sample-lyrics.js file
		fontSize: 18,

		// active navigation page (0: info, 1: image, 2: lyrics, 3: styling, 4: download)
		navPage: 0
	},
	action
) {
	switch (action.type) {
		// image
		case 'SET_IMAGE': {
			return {
				...state,
				imageAspectRatio: action.payload.imageAspectRatio,
				imageName: action.payload.imageName,
				imageURL: action.payload.imageURL
			};
		}
		case 'SET_IMAGE_HEIGHT': {
			return { ...state, imageHeight: action.payload };
		}
		case 'SET_POSTER_URL': {
			return { ...state, posterURL: action.payload };
		}

		// text
		case 'SET_LYRICS': {
			return { ...state, lyrics: action.payload };
		}
		case 'SET_FONT_SIZE': {
			return { ...state, fontSize: action.payload };
		}

		// navigation
		case 'NAV_BACK': {
			const newNavPage = state.navPage - 1;
			if (newNavPage < 0) {
				return { ...state, navPage: 0 };
			}
			else {
				return { ...state, navPage: newNavPage };
			}
		}
		case 'NAV_FORWARD': {
			const newNavPage = state.navPage + 1;
			if (newNavPage > 4) {
				return { ...state, navPage: 4 };
			}
			else {
				return { ...state, navPage: newNavPage };
			}
		}

		// default
		default: {
			return state;
		}
	}
}