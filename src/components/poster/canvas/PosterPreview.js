import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Magnifier from 'react-magnifier';
import Spinner from 'react-spinkit';


export default class PosterPreview extends Component {

	constructor(props) {
		super(props);

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
		if (this.state.screenWidth <= 1000) {
			return '100%';
		}
		else {
			const posterWidth = this.props.posterHeight * this.props.aspectRatio;
			const margin = '40';
			const settingsWidth = '440';

			const heightScaled = (this.state.screenHeight - (2 * margin)) / this.props.posterHeight;
			const widthScaled = (this.state.screenWidth - settingsWidth - (3 * margin)) / posterWidth;
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