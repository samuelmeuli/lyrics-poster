import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Poster from './poster/Poster';
import MenuContainer from './menu/MenuContainer';


export default class App extends Component {
	/**
	 * Make sure the requested page is within the existing range
	 */
	static validatePage(newPage) {
		let validatedPage = newPage;
		if (newPage < 0) {
			validatedPage = 0;
		}
		else if (newPage > 4) {
			validatedPage = 4;
		}
		return validatedPage;
	}

	constructor(props) {
		super(props);

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
			const validatedPage = App.validatePage(newPage);
			window.history.replaceState(null, null, `#${validatedPage}`);
			this.props.setNavPage(validatedPage);
		}
	}

	/**
	 * Navigate to requested page and push new state to history stack
	 */
	navigate(newPage) {
		const validatedPage = App.validatePage(newPage);
		window.history.pushState(null, null, `#${validatedPage}`);
		this.props.setNavPage(validatedPage);
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
	// Redux functions
	setNavPage: PropTypes.func.isRequired
};
