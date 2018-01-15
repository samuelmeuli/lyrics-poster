import React, { Component } from 'react';
import PropTypes from 'prop-types';

import iconDownload from '../../../images/icons/nav-icons/download.svg';
import iconImage from '../../../images/icons/nav-icons/image.svg';
import iconInfo from '../../../images/icons/nav-icons/info.svg';
import iconLyrics from '../../../images/icons/nav-icons/lyrics.svg';
import iconStyling from '../../../images/icons/nav-icons/styling.svg';


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
				<button className="button-back" onClick={this.navBack}>
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
				<button className="button-next" onClick={this.navForward} disabled={this.props.disableNext}>
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
		this.props.navBack();
	}

	navForward(e) {
		e.preventDefault();
		this.props.navForward();
	}

	render() {
		return (
			<nav>
				{this.getButtonBack()}
				{this.props.showApply && <button>Apply</button>}
				{this.getButtonNext()}
			</nav>
		);
	}
}


Nav.propTypes = {
	// Redux attributes
	navPage: PropTypes.number.isRequired,

	// Redux functions
	navBack: PropTypes.func.isRequired,
	navForward: PropTypes.func.isRequired,

	// other props
	disableNext: PropTypes.bool,
	showApply: PropTypes.bool
};

Nav.defaultProps = {
	disableNext: false,
	showApply: false
};