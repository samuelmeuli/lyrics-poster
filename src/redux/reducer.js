export default function reducer(
	state = {
		imageAspectRatio: 1.5,
		imageHeight: 1500,
		imageURL: '',
		fontSize: 10,
		lyrics: `Lorem ipsum dolor sit amet,
consetetur sadipscing elitr,
sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
sed diam voluptua.
At vero eos et accusam et justo duo dolores et ea rebum.
Stet clita kasd gubergren,
no sea takimata sanctus est Lorem ipsum dolor sit amet.
Lorem ipsum dolor sit amet,
consetetur sadipscing elitr,
sed diam nonumy eirmod tempor invidunt ut labore
et dolore magna aliquyam erat,
sed diam voluptua.
At vero eos et accusam et justo duo dolores et ea rebum.
Stet clita kasd gubergren,
no sea takimata sanctus est
Lorem ipsum dolor sit amet.`
	},
	action
) {
	switch (action.type) {
		case 'SET_FONT_SIZE': {
			return { ...state, fontSize: action.payload };
		}
		case 'SET_IMAGE': {
			return {
				...state,
				imageAspectRatio: action.payload.imageAspectRatio,
				imageURL: action.payload.imageURL
			};
		}
		case 'SET_IMAGE_HEIGHT': {
			return { ...state, imageHeight: action.payload };
		}
		case 'SET_LYRICS': {
			return { ...state, lyrics: action.payload };
		}
		default: {
			return state;
		}
	}
}