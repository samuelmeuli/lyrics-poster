export default function reducer(
	state = {
		imageHeight: 600,
		imageWidth: 400,
		fontSize: 20,
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
		case 'SET_IMAGE_HEIGHT': {
			return { ...state, lyrics: action.payload };
		}
		case 'SET_IMAGE_WIDTH': {
			return { ...state, lyrics: action.payload };
		}
		case 'SET_FONT_SIZE': {
			return { ...state, fontSize: action.payload };
		}
		case 'SET_LYRICS': {
			return { ...state, lyrics: action.payload };
		}
		default: {
			return state;
		}
	}
}