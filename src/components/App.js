import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Poster from './poster/Poster';
import MenuContainer from './menu/MenuContainer';


export default class App extends Component {

	constructor(props) {
		super(props);

		this.nrOfNavPages = 5;

		// Detect requested page
		const path = window.location.hash;
		if (path !== '') {
			if (path.startsWith('#')) {
				this.onHashChange(path);
			}
			else {
				window.history.replaceState(null, null, '/');
			}
		}

		// Change page on URL hash changes
		window.onhashchange = () => this.onHashChange(window.location.hash);

		// Function bindings
		this.navigate = this.navigate.bind(this);
	}

	/**
	 * Update current page on hash changes (do NOT push new state to history stack)
	 */
	onHashChange(newPath) {
		const newPage = parseInt(newPath.substr(1), 10);
		if (Number.isNaN(newPage)) {
			window.history.replaceState(null, null, '/');
			this.props.setNavPage(0);
		}
		else {
			const validatedPage = this.validatePage(newPage);
			window.history.replaceState(null, null, `#${validatedPage}`);
			this.props.setNavPage(validatedPage);
		}
	}

	/**
	 * Navigate to requested page and push new state to history stack
	 */
	navigate(newPage) {
		const validatedPage = this.validatePage(newPage);
		window.history.pushState(null, null, `#${validatedPage}`);
		this.props.setNavPage(validatedPage);
	}

	/**
	 * Make sure the requested page is within the existing range
	 */
	validatePage(newPage) {
		let validatedPage = newPage;
		if (newPage < 0) {
			validatedPage = 0;
		}
		else if (newPage > (this.nrOfNavPages - 1)) {
			validatedPage = (this.nrOfNavPages - 1);
		}

		let lastAccessiblePage = 0;
		for (let i = 1; i <= validatedPage; i += 1) {
			if (this.props.completedPages[i - 1] === true) {
				lastAccessiblePage = i;
			}
			else {
				break;
			}
		}
		return lastAccessiblePage;
	}

	render() {
		return (
			<main>
				<MenuContainer navigate={this.navigate} />
				<Poster />
			</main>
		);
	}
}

App.propTypes = {
	// Redux attributes
	completedPages: PropTypes.arrayOf(PropTypes.bool).isRequired,

	// Redux functions
	setNavPage: PropTypes.func.isRequired
};
