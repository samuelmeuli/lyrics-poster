import React from 'react';

import PosterContainer from './containers/poster/PosterContainer';
import MenuContainer from './containers/menu/MenuContainer';


export default function App() {
	return (
		<main>
			<MenuContainer />
			<PosterContainer />
		</main>
	);
}