import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NavContainer from '../elements/NavContainer';


export default class Styling extends Component {

	constructor(props) {
		super(props);

		// state contains the form values
		this.state = {
			newFontSize: this.props.fontSize
		};

		// function bindings
		this.updateSettings = this.updateSettings.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		// settings have changed -> update form values
		if (nextProps !== this.props) {
			this.setState({	newFontSize: nextProps.fontSize });
		}
	}

	updateSettings(event) {
		event.preventDefault();

		// update Redux state with form values (if they have changed)
		if (this.state.newFontSize !== this.props.fontSize) {
			this.props.setFontSize(this.state.newFontSize);
		}
	}

	render() {
		return (
			<form onSubmit={this.updateSettings}>
				<div>
					<fieldset>
						<legend>Image style</legend>

						<p>TODO Brightness</p>
						<p>TODO Contrast</p>
					</fieldset>

					<fieldset>
						<legend>Text style</legend>
						<li>
							<label htmlFor="input-font">
								Font:
								<input
									type="text"
									id="input-font"
								/>
							</label>
						</li>
						<li>
							<label htmlFor="input-font-size">
								Font size:
								<input
									type="number"
									id="input-font-size"
									value={this.state.newFontSize}
									onChange={e => this.setState({ newFontSize: parseInt(e.target.value, 10) })}
								/>
							</label>
						</li>
						<li>
							<label htmlFor="input-line-height">
								Line height:
								<input
									type="text"
									id="input-line-height"
								/>
							</label>
						</li>
					</fieldset>
				</div>
				<NavContainer showApply />
			</form>
		);
	}
}


Styling.propTypes = {
	// Redux attributes
	fontSize: PropTypes.number.isRequired,

	// Redux functions
	setFontSize: PropTypes.func.isRequired
};