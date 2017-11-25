import React from 'react';

import PosterContainer from './containers/Poster/PosterContainer';
import SettingsContainer from './containers/Settings/SettingsContainer';


export default function App() {
	return (
		<main>
			<SettingsContainer />
			<PosterContainer />
		</main>
	);
}