import React, { Component } from 'react';
import PropTypes from 'prop-types';

import iconDownload from '../../../images/icons/nav/download.svg';
import iconImage from '../../../images/icons/nav/image.svg';
import iconInfo from '../../../images/icons/nav/info.svg';
import iconLyrics from '../../../images/icons/nav/lyrics.svg';
import iconStyling from '../../../images/icons/nav/styling.svg';


export default class Nav extends Component {

	constructor(props) {
		super(props);

		this.icons = [iconInfo, iconImage, iconLyrics, iconStyling, iconDownload];

		// function bindings
		this.navBack = this.navBack.bind(this);
		this.navForward = this.navForward.bind(this);
	}

	getButtonBack() {
		if (this.props.navPage > 0) {
			return (
				<button
					type="button"
					className="button-back"
					onClick={this.navBack}
				>
					<img src={this.icons[this.props.navPage - 1]} alt="Back" width="18px" />
				</button>
			);
		}
		else {
			return <div />;
		}
	}

	getButtonNext() {
		if (this.props.navPage < 4) {
			return (
				<button
					type="button"
					className="button-next"
					onClick={this.navForward}
					disabled={this.props.disableNext}
				>
					<img src={this.icons[this.props.navPage + 1]} alt="Next" width="18px" />
				</button>
			);
		}
		else {
			return <div />;
		}
	}

	navBack(e) {
		e.preventDefault();
		this.props.navigate(this.props.navPage - 1);
	}

	navForward(e) {
		e.preventDefault();
		this.props.navigate(this.props.navPage + 1);
	}

	render() {
		return (
			<nav>
				{this.getButtonBack()}
				{
					this.props.showApply &&
						<button type="submit" disabled={this.props.disableApply}>
							Apply
						</button>
				}
				{this.getButtonNext()}
			</nav>
		);
	}
}


Nav.propTypes = {
	// Redux attributes
	navPage: PropTypes.number.isRequired,

	// other props
	disableApply: PropTypes.bool,
	disableNext: PropTypes.bool,
	showApply: PropTypes.bool,

	// other props
	navigate: PropTypes.func.isRequired
};

Nav.defaultProps = {
	disableApply: false,
	disableNext: false,
	showApply: false
};
