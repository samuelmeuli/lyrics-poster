import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class NumberInput extends Component {

	constructor(props) {
		super(props);

		this.state = {
			value: String(this.props.value)
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			value: nextProps.value
		});
	}

	onBlur(value) {
		if (value === '') {
			this.props.onChange(this.props.min);
		}
		else {
			// value is min or smaller
			if (value <= this.props.min) {
				this.props.onChange(this.props.min);
			}
			// value is max or larger
			else if (value >= this.props.max) {
				this.props.onChange(this.props.max);
			}
			// value is between min and max
			else {
				// value is integer
				if (Number.isInteger(this.props.step)) {
					this.props.onChange(parseInt(value, 10));
				}
				// value is float
				else {
					this.props.onChange(parseFloat(value));
				}
			}
		}
	}

	decrement() {
		const newValue = this.props.value - this.props.step;
		if (newValue > this.props.min) {
			this.props.onChange(this.props.value - this.props.step);
		}
		else {
			this.props.onChange(this.props.min);
		}
	}

	increment() {
		const newValue = this.props.value + this.props.step;
		if (newValue < this.props.max) {
			this.props.onChange(this.props.value + this.props.step);
		}
		else {
			this.props.onChange(this.props.max);
		}
	}

	render() {
		return (
			<div className="number-input">
				<input
					type="number"
					value={this.state.value}
					step={this.props.step}
					onBlur={e => this.onBlur(e.target.value)}
					onChange={e => this.setState({ value: e.target.value })}
				/>
				<div className="plus-minus-buttons">
					<button type="button" onClick={() => this.increment()}>
						<p>+</p>
					</button>
					<button	type="button" onClick={() => this.decrement()}>
						<p>–</p>
					</button>
				</div>
			</div>
		);
	}
}


NumberInput.propTypes = {
	value: PropTypes.number.isRequired,
	step: PropTypes.number,
	min: PropTypes.number,
	max: PropTypes.number,
	onChange: PropTypes.func
};

NumberInput.defaultProps = {
	step: 1,
	min: 0,
	max: 100,
	onChange: null
};