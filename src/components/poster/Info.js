import React from 'react';

import iconGitHub from '../../images/icons/credits/github.svg';
import iconZondicons from '../../images/icons/credits/icons.svg';
import iconZoom from '../../images/icons/zoom.svg';


export default function Info() {
	return (
		<div className="info-container">
			<p className="zoom-info">
				<img src={iconZoom} alt="Next" width="18px" className="zoom-icon" />
				Hover/touch on poster to zoom
			</p>
			<div className="credits-container">
				<a
					href="https://github.com/samuelmeuli/lyrics-posters"
					target="_blank"
					rel="noreferrer noopener"
				>
					<img src={iconGitHub} alt="Next" width="13px" />
					Source code on GitHub
				</a>
				<a href="https://www.zondicons.com">
					<img src={iconZondicons} alt="Next" width="13px" />
					Zondicons by Steve Schoger
				</a>
			</div>
		</div>
	);
}
