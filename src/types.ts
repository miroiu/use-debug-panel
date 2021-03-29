export type InputProps<T> = {
	value: T;
	onChange: (value: T) => void;
};

export type DebugValueType<T extends string> = {
	__dbg_type: T;
};

export type SliderType = DebugValueType<'slider'> & {
	min?: number;
	max?: number;
	step?: number;
	value: number;
};

export type ColorType = DebugValueType<'color'> & {
	value: string;
};
