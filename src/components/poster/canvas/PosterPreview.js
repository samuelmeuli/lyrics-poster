import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Magnifier from 'react-magnifier';
import Spinner from 'react-spinkit';

import samplePoster1 from '../../../images/sample-posters/sample-poster-1.png';
import samplePoster2 from '../../../images/sample-posters/sample-poster-2.png';
import samplePoster3 from '../../../images/sample-posters/sample-poster-3.png';


export default class PosterPreview extends Component {

	constructor(props) {
		super(props);

		this.marginSmall = 20;
		this.marginMedium = 30;
		this.marginLarge = 40;
		this.infoContainerHeight = 35;
		this.infoContainerMargin = 10;
		this.settingsWidth = 440;

		this.samplePosters = [
			{ src: samplePoster1, height: 1500, aspectRatio: 1 },
			{ src: samplePoster2, height: 1335, aspectRatio: 1.5 },
			{ src: samplePoster3, height: 1333, aspectRatio: 0.667 }
		];

		this.state = {
			screenHeight: window.innerHeight,
			screenWidth: window.innerWidth
		};

		// function bindings
		this.onWindowResize = this.onWindowResize.bind(this);

		// window resize event listener
		window.addEventListener('resize', this.onWindowResize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.onWindowResize);
	}

	onWindowResize() {
		clearTimeout(this.resizeTimeout);
		this.resizeTimeout = setTimeout(() => {
			const newScreenWidth = window.innerWidth;
			const newScreenHeight = window.innerHeight;
			if (newScreenWidth !== this.state.screenWidth ||
				newScreenHeight !== this.state.screenHeight) {
				this.setState({
					screenHeight: newScreenHeight,
					screenWidth: newScreenWidth
				});
			}
		}, 100);
	}

	getRandomSamplePoster() {
		const randomIndex = Math.floor(Math.random() * this.samplePosters.length);
		return this.samplePosters[randomIndex];
	}

	calcScaledWidth(posterHeight, aspectRatio) {
		// on small screens: full width
		if (this.state.screenWidth <= 700) {
			return this.state.screenWidth - (2 * this.marginSmall);
		}
		// on medium-sized screens: full width
		else if (this.state.screenWidth <= 1000) {
			return this.state.screenWidth - (2 * this.marginMedium);
		}
		// on large screens: calculate scaled width
		else {
			// absolute canvas width
			const posterWidth = posterHeight * aspectRatio;

			// scaled canvas height and width
			const heightScaled = (this.state.screenHeight - this.infoContainerHeight -
				this.infoContainerMargin - (2 * this.marginLarge)) / posterHeight;
			const widthScaled = (this.state.screenWidth - this.settingsWidth - (3 * this.marginLarge)) /
				posterWidth;
			if (heightScaled < widthScaled) {
				return posterWidth * heightScaled;
			}
			else {
				return posterWidth * widthScaled;
			}
		}
	}

	render() {
		const { aspectRatio, isLoading, navPage, posterHeight, posterURL } = this.props;

		// sample poster (random)
		if (navPage === 0) {
			const samplePoster = this.getRandomSamplePoster();
			return (
				<Magnifier
					src={samplePoster.src}
					alt="Sample poster"
					width={this.calcScaledWidth(samplePoster.height, samplePoster.aspectRatio)}
				/>
			);
		}
		// black image placeholder (used during image selection step)
		else if (posterURL === '') {
			return (
				<div
					style={{
						height: this.calcScaledWidth(posterHeight, aspectRatio) / aspectRatio,
						width: this.calcScaledWidth(posterHeight, aspectRatio),
						backgroundColor: 'black'
					}}
				/>
			);
		}
		// loading spinner
		else if (isLoading) {
			return (
				<div
					style={{
						height: this.calcScaledWidth(posterHeight, aspectRatio) / aspectRatio,
						width: this.calcScaledWidth(posterHeight, aspectRatio),
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					<Spinner name="rotating-plane" color="#D14949" />
				</div>
			);
		}
		// poster preview
		else {
			return (
				<Magnifier
					src={posterURL}
					alt="Poster preview"
					width={this.calcScaledWidth(posterHeight, aspectRatio)}
				/>
			);
		}
	}
}


PosterPreview.propTypes = {
	// Redux attributes
	aspectRatio: PropTypes.number.isRequired,
	isLoading: PropTypes.bool.isRequired,
	navPage: PropTypes.number.isRequired,
	posterHeight: PropTypes.number.isRequired,
	posterURL: PropTypes.string.isRequired
};
