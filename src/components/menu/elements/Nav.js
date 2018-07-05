import React, { Component } from 'react';
import PropTypes from 'prop-types';

import iconButtonBack from '../../../images/icons/buttons/arrow-left.svg';
import iconButtonNext from '../../../images/icons/buttons/arrow-right.svg';


export default class Nav extends Component {

	constructor(props) {
		super(props);

		this.nrOfNavPages = 5;

		// function bindings
		this.navBack = this.navBack.bind(this);
		this.navForward = this.navForward.bind(this);
	}

	getButtonBack() {
		if (this.props.navPage > 0) {
			return (
				<button
					type="button"
					onClick={this.navBack}
				>
					<img src={iconButtonBack} alt="Back" width="10px" />
				</button>
			);
		}
		else {
			return <div />;
		}
	}

	getButtonNext() {
		if (this.props.navPage === 0) {
			return (
				<button
					type="button"
					className="start-button"
					onClick={this.navForward}
				>
					Start
					<img src={iconButtonNext} alt="Start" width="10px" />
				</button>
			);
		}

		if (this.props.navPage < (this.nrOfNavPages - 1)) {
			return (
				<button
					type="button"
					onClick={this.navForward}
					disabled={this.props.disableNext}
				>
					<img src={iconButtonNext} alt="Next" width="10px" />
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
