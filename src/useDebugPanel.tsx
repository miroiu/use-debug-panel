import { useContext, useEffect, useState } from 'react';
import { DebugPanelContext } from './DebugPanelProvider';
import { ColorType } from './types';

export const useDebugPanel = <T extends object>(
	value: T,
	title?: string
): T => {
	const context = useContext(DebugPanelContext);
	const [id, setId] = useState<number | null>(null);

	useEffect(() => {
		const id = context.createPanel(value, title);
		setId(id);
		return () => context.removePanel(id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return id ? context.getResult<T>(id) ?? value : value;
};

export const makeType = <T extends string, U extends object>(
	type: T,
	defaultValues: U
): U => ({ ...defaultValues, __dbg_type: type });

type SliderType = {
	value: number;
	min?: number;
	max?: number;
	step?: number;
};

export const makeSlider = (defaultValue: SliderType | number) =>
	makeType(
		'slider',
		typeof defaultValue === 'number'
			? { value: defaultValue }
			: defaultValue
	);

export const makeColor = (defaultValue: ColorType | string) =>
	makeType(
		'color',
		typeof defaultValue === 'string'
			? { value: defaultValue }
			: defaultValue
	);
