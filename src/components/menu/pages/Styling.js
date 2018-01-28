import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontPicker from 'font-picker-react';

import NavContainer from '../elements/NavContainer';


export default class Styling extends Component {

	constructor(props) {
		super(props);

		// state contains the form values
		this.state = {
			newBackgroundColor: this.props.backgroundColor,
			newBrightness: this.props.brightness,
			newContrast: this.props.contrast,
			newFontFamily: this.props.fontFamily,
			newFontSize: this.props.fontSize,
			newLineHeight: this.props.lineHeight
		};

		// function bindings
		this.onChangeBackground = this.onChangeBackground.bind(this);
		this.updateSettings = this.updateSettings.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		// settings have changed -> update form values
		if (nextProps !== this.props) {
			this.setState({
				newBackgroundColor: nextProps.backgroundColor,
				newBrightness: nextProps.brightness,
				newContrast: nextProps.contrast,
				newFontFamily: nextProps.fontFamily,
				newFontSize: nextProps.fontSize,
				newLineHeight: nextProps.lineHeight
			});
		}
	}

	onChangeBackground() {
		if (this.state.newBackgroundColor === 'black') {
			this.setState({
				newBackgroundColor: 'white'
			});
		}
		else {
			this.setState({
				newBackgroundColor: 'black'
			});
		}
	}

	updateSettings(event) {
		event.preventDefault();

		// update Redux state with form values (if they have changed)
		if (this.state.newBackgroundColor !== this.props.backgroundColor) {
			this.props.setBackgroundColor(this.state.newBackgroundColor);
		}
		if (this.state.newBrightness !== this.props.contrast) {
			this.props.setBrightness(this.state.newBrightness);
		}
		if (this.state.newContrast !== this.props.contrast) {
			this.props.setContrast(this.state.newContrast);
		}
		if (this.state.newFontFamily !== this.props.fontFamily) {
			this.props.setFontFamily(this.state.newFontFamily);
		}
		if (this.state.newFontSize !== this.props.fontSize) {
			this.props.setFontSize(this.state.newFontSize);
		}
		if (this.state.newLineHeight !== this.props.lineHeight) {
			this.props.setLineHeight(this.state.newLineHeight);
		}
	}

	render() {
		return (
			<form onSubmit={this.updateSettings}>
				<div>
					<fieldset>
						<legend>Background</legend>
						Background color:
						<label htmlFor="input-background-black">
							<input
								type="radio"
								name="input-background"
								value="male"
								id="input-background-black"
								checked={this.state.newBackgroundColor === 'black'}
								onChange={this.onChangeBackground}
							/>
							black
						</label>
						<label htmlFor="input-background-white">
							<input
								type="radio"
								name="input-background"
								value="female"
								id="input-background-white"
								checked={this.state.newBackgroundColor === 'white'}
								onChange={this.onChangeBackground}
							/>
							white
						</label>
					</fieldset>

					<fieldset>
						<legend>Image style</legend>

						<label htmlFor="input-brightness">
							Brightness:
							<input
								type="range"
								min="0"
								max="200"
								step="10"
								value={this.state.newBrightness}
								onChange={e => this.setState({ newBrightness: parseInt(e.target.value, 10) })}
								id="input-brightness"
							/>
							{this.state.newBrightness} %
						</label>

						<label htmlFor="input-contrast">
							Contrast:
							<input
								type="range"
								min="0"
								max="200"
								step="10"
								value={this.state.newContrast}
								onChange={e => this.setState({ newContrast: parseInt(e.target.value, 10) })}
								id="input-contrast"
							/>
							{this.state.newContrast} %
						</label>
					</fieldset>

					<fieldset>
						<legend>Text style</legend>
						<ul>
							<li>
								<label htmlFor="input-font">
									Font:
									<FontPicker
										apiKey="AIzaSyAOkdDlx49HCSBdu86oe8AD1Q7piIxlR6k"
										defaultFont={this.props.fontFamily}
										options={{
											variants: ['900']
										}}
										onChange={newFont => this.setState({ newFontFamily: newFont.family })}
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
										type="number"
										id="input-line-height"
										value={this.state.newLineHeight}
										onChange={e =>
											this.setState({ newLineHeight: Math.round(e.target.value * 10) / 10 })
										}
									/>
								</label>
							</li>
						</ul>
					</fieldset>
				</div>
				<NavContainer showApply />
			</form>
		);
	}
}


Styling.propTypes = {
	// Redux attributes
	backgroundColor: PropTypes.string.isRequired,
	brightness: PropTypes.number.isRequired,
	contrast: PropTypes.number.isRequired,
	fontFamily: PropTypes.string.isRequired,
	fontSize: PropTypes.number.isRequired,
	lineHeight: PropTypes.number.isRequired,

	// Redux functions
	setBackgroundColor: PropTypes.func.isRequired,
	setBrightness: PropTypes.func.isRequired,
	setContrast: PropTypes.func.isRequired,
	setFontFamily: PropTypes.func.isRequired,
	setFontSize: PropTypes.func.isRequired,
	setLineHeight: PropTypes.func.isRequired
};