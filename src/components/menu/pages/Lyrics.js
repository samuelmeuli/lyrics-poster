import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NavContainer from '../elements/NavContainer';


export default class Lyrics extends Component {

	constructor(props) {
		super(props);

		// state contains the form values
		this.state = {
			newLyrics: this.props.lyrics
		};

		// function bindings
		this.updateSettings = this.updateSettings.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		// settings have changed -> update form values
		if (nextProps !== this.props) {
			this.setState({ newLyrics: nextProps.lyrics });
		}
	}

	hasChanged() {
		return this.state.newLyrics !== this.props.lyrics;
	}

	updateSettings(event) {
		event.preventDefault();

		// update Redux state with form values (if they have changed)
		if (this.state.newLyrics !== this.props.lyrics) {
			this.props.setLyrics(this.state.newLyrics);
		}
	}

	render() {
		return (
			<form onSubmit={this.updateSettings}>
				<fieldset>
					<legend>Lyrics</legend>
					<label htmlFor="input-lyrics">
						Enter your song lyrics:
						<textarea
							id="input-lyrics"
							value={this.state.newLyrics}
							onChange={e => this.setState({ newLyrics: e.target.value })}
						/>
					</label>
				</fieldset>
				<NavContainer showApply disableApply={!this.hasChanged()} />
			</form>
		);
	}
}


Lyrics.propTypes = {
	// Redux attributes
	lyrics: PropTypes.string.isRequired,

	// Redux functions
	setLyrics: PropTypes.func.isRequired
};