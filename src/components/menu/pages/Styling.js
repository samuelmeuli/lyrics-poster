import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontPicker from 'font-picker-react';

import NavContainer from '../elements/NavContainer';
import NumberInput from '../elements/NumberInput';


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

	hasChanged() {
		return (
			this.state.newBackgroundColor !== this.props.backgroundColor ||
			this.state.newBrightness !== this.props.brightness ||
			this.state.newContrast !== this.props.contrast ||
			this.state.newFontFamily !== this.props.fontFamily ||
			this.state.newFontSize !== this.props.fontSize ||
			this.state.newLineHeight !== this.props.lineHeight
		);
	}

	updateSettings(event) {
		event.preventDefault();

		// update Redux state with form values (if they have changed)
		if (this.state.newBackgroundColor !== this.props.backgroundColor) {
			this.props.setBackgroundColor(this.state.newBackgroundColor);
		}
		if (this.state.newBrightness !== this.props.brightness) {
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
					<fieldset id="fieldset-background">
						<legend>Background</legend>
						<div id="background-settings">
							<span className="label-left">Background color:</span>
							<div>
								<label htmlFor="input-background-black">
									<input
										type="radio"
										name="input-background"
										value="male"
										id="input-background-black"
										checked={this.state.newBackgroundColor === 'black'}
										onChange={this.onChangeBackground}
									/>
									<span className="radio-button" />
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
									<span className="radio-button" />
									white
								</label>
							</div>
						</div>
					</fieldset>

					<fieldset id="fieldset-image-style">
						<legend>Image style</legend>

						<label htmlFor="input-brightness">
							<span className="label-left">Brightness:</span>
							<input
								type="range"
								min="0"
								max="200"
								step="10"
								value={this.state.newBrightness}
								onChange={e => this.setState({ newBrightness: parseInt(e.target.value, 10) })}
								id="input-brightness"
							/>
							<span className="unit">{this.state.newBrightness} %</span>
						</label>

						<label htmlFor="input-contrast">
							<span className="label-left">Contrast:</span>
							<input
								type="range"
								min="0"
								max="200"
								step="10"
								value={this.state.newContrast}
								onChange={e => this.setState({ newContrast: parseInt(e.target.value, 10) })}
								id="input-contrast"
							/>
							<span className="unit">{this.state.newContrast} %</span>
						</label>
					</fieldset>

					<fieldset id="fieldset-text-style">
						<legend>Text style</legend>
						<label htmlFor="input-font">
							<span className="label-left">Font:</span>
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
						<label htmlFor="input-font-size">
							<span className="label-left">Font size:</span>
							<NumberInput
								id="input-font-size"
								step={1}
								min={5}
								max={50}
								value={this.state.newFontSize}
								onChange={f => this.setState({ newFontSize: f })}
							/>
							<span className="unit">px</span>
						</label>
						<label htmlFor="input-line-height">
							<span className="label-left">Line height:</span>
							<NumberInput
								id="input-line-height"
								step={0.1}
								min={0.1}
								max={3}
								value={this.state.newLineHeight}
								onChange={l => this.setState({ newLineHeight: Math.round(l * 10) / 10 })}
							/>
							<span className="unit">px</span>
						</label>
					</fieldset>
				</div>
				<NavContainer showApply disableApply={!this.hasChanged()} />
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