import React from 'react';

import { SliderType, InputProps, ColorType } from './types';

export const StringInput: React.FC<InputProps<string>> = ({
	value,
	onChange,
}) => {
	return <input value={value} onChange={ev => onChange(ev.target.value)} />;
};

export const NumberInput: React.FC<InputProps<number>> = ({
	value,
	onChange,
}) => {
	return (
		<input
			value={value}
			type="number"
			onChange={ev => onChange(ev.target.valueAsNumber)}
		/>
	);
};

export const BooleanInput: React.FC<InputProps<boolean>> = ({
	value,
	onChange,
}) => {
	return (
		<input
			type="checkbox"
			checked={value}
			onChange={ev => onChange(ev.target.checked)}
		/>
	);
};

export const DateInput: React.FC<InputProps<Date>> = ({ value, onChange }) => {
	return (
		<input
			type="date"
			value={value.toISOString().substring(0, 10)}
			onChange={ev => onChange(ev.target.valueAsDate!)}
		/>
	);
};

export const SliderInput: React.FC<InputProps<SliderType>> = ({
	value,
	onChange,
}) => {
	return (
		<input
			type="range"
			min={value.min}
			step={value.step}
			max={value.max}
			value={value.value}
			onChange={ev =>
				onChange({
					...value,
					value: ev.target.valueAsNumber,
				})
			}
		/>
	);
};

export const ColorInput: React.FC<InputProps<ColorType>> = ({
	value,
	onChange,
}) => {
	return (
		<input
			type="color"
			value={value.value}
			onChange={ev =>
				onChange({
					...value,
					value: ev.target.value,
				})
			}
		/>
	);
};

export const GenericInput: React.FC<InputProps<any>> = ({ value }) => {
	return (
		<input
			disabled
			defaultValue={
				value === null
					? 'null'
					: value === undefined
					? 'undefined'
					: value.toString()
			}
		/>
	);
};
