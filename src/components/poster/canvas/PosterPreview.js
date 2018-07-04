import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Magnifier from 'react-magnifier';
import Spinner from 'react-spinkit';


export default class PosterPreview extends Component {

	constructor(props) {
		super(props);

		this.marginLarge = 40;
		this.infoContainerHeight = 35;
		this.infoContainerMargin = 10;
		this.settingsWidth = 440;

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

	calcScaledWidth() {
		// on small and medium-sized screens: full width
		if (this.state.screenWidth <= 1000) {
			return '100%';
		}
		// on large screens: calculate scaled width
		else {
			// absolute canvas width
			const posterWidth = this.props.posterHeight * this.props.aspectRatio;

			// scaled canvas height and width
			const heightScaled = (this.state.screenHeight - this.infoContainerHeight -
				this.infoContainerMargin - (2 * this.marginLarge)) / this.props.posterHeight;
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
		if (this.props.posterURL === '') {
			return (
				<div
					style={{
						height: this.calcScaledWidth() / this.props.aspectRatio,
						width: this.calcScaledWidth(),
						backgroundColor: 'black'
					}}
				/>
			);
		}
		else if (this.props.isLoading) {
			return (
				<div
					style={{
						height: this.calcScaledWidth() / this.props.aspectRatio,
						width: this.calcScaledWidth(),
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					<Spinner name="rotating-plane" color="#D14949" />
				</div>
			);
		}
		else {
			return (
				<Magnifier
					src={this.props.posterURL}
					alt="Poster preview"
					width={this.calcScaledWidth()}
				/>
			);
		}
	}
}


PosterPreview.propTypes = {
	// Redux attributes
	aspectRatio: PropTypes.number.isRequired,
	isLoading: PropTypes.bool.isRequired,
	posterHeight: PropTypes.number.isRequired,
	posterURL: PropTypes.string.isRequired
};
