const defaultPosterHeight = 3000;

export default function reducer(
	// default state
	state = {
		image: {
			aspectRatio: 1.5, // ratio width : height
			dataURL: '', // image file encoded as data URL,
			name: '' // name of selected image file
		},
		poster: {
			backgroundColor: 'black',
			brightness: 100,
			contrast: 100,
			dataURL: '', // poster (canvas) encoded as data URL
			exceedsSizeLimit: false,
			height: defaultPosterHeight,
			isLoading: false
		},
		text: {
			fontFamily: 'Maven Pro',
			fontSize: Math.round(defaultPosterHeight / 60),
			lineHeight: 0.9,
			lyrics: '',
			separator: ' '
		},
		nav: {
			completedPages: [true, false, true, true, true],
			page: 0 // active navigation page
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
		case 'SET_POSTER_BACKGROUND': {
			return {
				...state,
				poster: {
					...state.poster,
					backgroundColor: action.payload
				}
			};
		}
		case 'SET_POSTER_BRIGHTNESS': {
			return {
				...state,
				poster: {
					...state.poster,
					brightness: action.payload
				}
			};
		}
		case 'SET_POSTER_CONTRAST': {
			return {
				...state,
				poster: {
					...state.poster,
					contrast: action.payload
				}
			};
		}
		case 'SET_EXCEEDS_SIZE_LIMIT': {
			return {
				...state,
				poster: {
					...state.poster,
					exceedsSizeLimit: action.payload
				}
			};
		}
		case 'SET_POSTER_HEIGHT': {
			return {
				...state,
				poster: {
					...state.poster,
					height: action.payload
				}
			};
		}
		case 'SET_POSTER_IS_LOADING': {
			return {
				...state,
				poster: {
					...state.poster,
					isLoading: action.payload
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
		case 'SET_FONT_FAMILY': {
			return {
				...state,
				text: {
					...state.text,
					fontFamily: action.payload
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
		case 'SET_LINE_HEIGHT': {
			return {
				...state,
				text: {
					...state.text,
					lineHeight: action.payload
				}
			};
		}
		case 'SET_LYRICS': {
			return {
				...state,
				text: {
					...state.text,
					lyrics: action.payload
				}
			};
		}
		case 'SET_SEPARATOR': {
			return {
				...state,
				text: {
					...state.text,
					separator: action.payload
				}
			};
		}

		// navigation
		case 'SET_COMPLETED_PAGE': {
			const completedPages = state.nav.completedPages.map((item, index) => {
				if (index !== action.payload.navPage) {
					return item;
				}
				return action.payload.isCompleted;
			});
			return {
				...state,
				nav: {
					...state.nav,
					completedPages
				}
			};
		}

		case 'SET_NAV_PAGE': {
			return {
				...state,
				nav: {
					...state.nav,
					page: action.payload
				}
			};
		}

		// default
		default: {
			return state;
		}
	}
}
