import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DownloadContainer from './pages/DownloadContainer';
import ImageContainer from './pages/ImageContainer';
import Info from './pages/Info';
import LyricsContainer from './pages/LyricsContainer';
import StylingContainer from './pages/StylingContainer';

import logo from '../../images/logo.svg';


export default class Menu extends Component {

	getPage() {
		switch (this.props.navPage) {
			case 0: {
				return <Info />;
			}
			case 1: {
				return <ImageContainer />;
			}
			case 2: {
				return <LyricsContainer />;
			}
			case 3: {
				return <StylingContainer />;
			}
			case 4: {
				return <DownloadContainer />;
			}
			default: {
				return null;
			}
		}
	}

	render() {
		return (
			<div className="menu-container">
				<div className="menu-page">
					<img src={logo} alt="LyricsPosters" className="logo" />
					{this.getPage()}
				</div>
				<div
					className="nav-indicator"
					style={{ width: `${this.props.navPage * 25}%` }}
				/>
			</div>
		);
	}
}


Menu.propTypes = {
	// Redux attributes
	navPage: PropTypes.number.isRequired
};