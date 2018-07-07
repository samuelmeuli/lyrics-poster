import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NavContainer from '../elements/NavContainer';
import sampleLyrics from '../../../sample-lyrics';


export default class Lyrics extends Component {

	constructor(props) {
		super(props);

		// state contains the form values
		this.state = {
			hasFocus: false,
			newLyrics: this.props.lyrics,
			newSeparator: this.props.separator
		};

		// function bindings
		this.onChangeSeparator = this.onChangeSeparator.bind(this);
		this.getDisplayedLyrics = this.getDisplayedLyrics.bind(this);
		this.updateSettings = this.updateSettings.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		// settings have changed -> update form values
		if (nextProps !== this.props) {
			this.setState({ newLyrics: nextProps.lyrics });
		}
	}

	onChangeSeparator(e) {
		const newSeparator = e.target.value;
		if (newSeparator === ' ' || newSeparator === ' / ' || newSeparator === ', ') {
			this.setState({
				newSeparator
			});
		}
	}

	getDisplayedLyrics() {
		if (this.state.hasFocus === false && this.state.newLyrics === '') {
			return sampleLyrics;
		}
		else {
			return this.state.newLyrics;
		}
	}

	hasChanged() {
		return (
			this.state.newLyrics !== this.props.lyrics ||
			this.state.newSeparator !== this.props.separator
		);
	}

	updateSettings(event) {
		event.preventDefault();

		// update Redux state with form values (if they have changed)
		if (this.state.newLyrics !== this.props.lyrics) {
			this.props.setLyrics(this.state.newLyrics);
		}
		if (this.state.newSeparator !== this.props.separator) {
			this.props.setSeparator(this.state.newSeparator);
		}
	}

	render() {
		const value = this.getDisplayedLyrics();
		return (
			<form onSubmit={this.updateSettings} noValidate>
				<fieldset className="fieldset-lyrics">
					<legend>Lyrics</legend>
					<label htmlFor="input-lyrics">
						Enter your song lyrics:
						<textarea
							id="input-lyrics"
							className={(this.state.newLyrics === '' && !this.state.hasFocus === true) ?
								'lyrics-placeholder' : ''}
							value={value}
							onChange={e => this.setState({ newLyrics: e.target.value })}
							onFocus={() => {
								this.setState({
									hasFocus: true
								});
							}}
							onBlur={() => {
								this.setState({
									hasFocus: false
								});
							}}
						/>
					</label>
					<div className="settings-separator">
						<span className="label-left">Line separator:</span>
						<div>
							<label htmlFor="separator-dash">
								<input
									type="radio"
									name="separator-settings"
									value=" / "
									id="separator-dash"
									checked={this.state.newSeparator === ' / '}
									onChange={this.onChangeSeparator}
								/>
								<span className="radio-button" />
								Dash (&quot;/&quot;)
							</label>
							<label htmlFor="separator-comma">
								<input
									type="radio"
									name="separator-settings"
									value=", "
									id="separator-comma"
									checked={this.state.newSeparator === ', '}
									onChange={this.onChangeSeparator}
								/>
								<span className="radio-button" />
								Comma (&quot;,&quot;)
							</label>
							<label htmlFor="separator-none">
								<input
									type="radio"
									name="separator-settings"
									value=" "
									id="separator-none"
									checked={this.state.newSeparator === ' '}
									onChange={this.onChangeSeparator}
								/>
								<span className="radio-button" />
								None
							</label>
						</div>
					</div>
				</fieldset>
				<NavContainer
					disableApply={!this.hasChanged()}
					navigate={this.props.navigate}
					showApply
				/>
			</form>
		);
	}
}


Lyrics.propTypes = {
	// Redux attributes
	lyrics: PropTypes.string.isRequired,
	separator: PropTypes.string.isRequired,

	// Redux functions
	setLyrics: PropTypes.func.isRequired,
	setSeparator: PropTypes.func.isRequired,

	// other props
	navigate: PropTypes.func.isRequired
};
