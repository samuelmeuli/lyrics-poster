import React from 'react';

import Info from './Info';
import PosterPreviewContainer from './canvas/PosterPreviewContainer';
import PosterGeneratorContainer from './canvas/PosterGeneratorContainer';


export default function Poster() {
	return (
		<div className="poster-container">
			<p className="preload-font apply-font">
				This element is hidden and needed for applying downloaded fonts
			</p>

			{/* Poster */}
			<PosterGeneratorContainer />
			<PosterPreviewContainer />

			{/* Zoom info and credits */}
			<Info />
		</div>
	);
}
