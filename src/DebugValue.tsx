import React from 'react';
import {
	BooleanInput,
	DateInput,
	NumberInput,
	StringInput,
	GenericInput,
	SliderInput,
	ColorInput,
} from './DebugInputType';
import { DebugValueType, InputProps } from './types';

const inputTypeMap = new Map<string, React.FC<InputProps<any>>>([
	['string', StringInput],
	['number', NumberInput],
	['boolean', BooleanInput],
	['slider', SliderInput],
	['date', DateInput],
	['object', GenericInput],
	['color', ColorInput],
]);

export const registerDebugInput = <
	T extends string,
	U extends DebugValueType<T>
>(
	type: T,
	comp: React.FC<InputProps<U>>
) => {
	inputTypeMap.set(type, comp);
};

const getTypeName = (value: any) => {
	const dataType = typeof value;

	if (value !== null && dataType === 'object') {
		if (value instanceof Date) {
			return 'date';
		} else if (Array.isArray(value)) {
			return 'array';
		} else if (value.__dbg_type) {
			return value.__dbg_type;
		}
	}

	return dataType;
};

export const DebugValue: React.FC<{
	label: string;
	value: any;
	onChange: (val: any) => void;
}> = ({ label, value, onChange }) => {
	const typeName = getTypeName(value);

	const InputComponent = inputTypeMap.get(typeName) ?? GenericInput;

	return (
		<>
			<label>{label}</label>
			<InputComponent value={value} onChange={onChange} />
		</>
	);
};
