import styled from '@emotion/styled';
import React, { memo } from 'react';
import { DebugValue } from './DebugValue';
import { Draggable } from './Draggable';

const DebugValuesWrapper = styled.div`
	display: grid;
	grid-template-columns: auto auto;
	grid-column-gap: 30px;
	grid-row-gap: 5px;
	padding: 10px;
	border-top: 1px solid dodgerblue;
`;

const DraggableContainer = styled.div`
	user-select: none;
	display: flex;
	flex-direction: column;
	box-shadow: 0px 0px 3px 2px rgba(30, 144, 255, 0.2);
	border: 1px solid dodgerblue;
	background-color: white;
`.withComponent(Draggable);

const Title = styled.span`
	font-weight: 600;
	margin: 5px;
	text-align: center;
	cursor: grab;
`;

export type DebugPanelType = {
	title?: string;
	position?: { x: number; y: number };
};

export const DebugPanel: React.FC<DebugPanelType> = ({
	children,
	title = 'useDebugPanel',
	position,
}) => {
	return (
		<DraggableContainer position={position}>
			<Title>{title}</Title>
			<DebugValuesWrapper onPointerDown={ev => ev.stopPropagation()}>
				{children}
			</DebugValuesWrapper>
		</DraggableContainer>
	);
};

type SmartDebugPanelType = DebugPanelType & {
	id: number;
	value: object;
	onChange: (id: number, value: object) => void;
};

function normalizeName(name: string) {
	const str = name.replace(/([^A-Z])([A-Z])/g, '$1 $2');
	return str[0].toUpperCase() + str.substring(1);
}

export const SmartDebugPanel: React.FC<SmartDebugPanelType> = memo(
	({ id, title, value, onChange, position }) => {
		return (
			<DebugPanel title={title} position={position}>
				{Object.entries(value).map(([key, propValue]) => (
					<DebugValue
						key={key}
						label={normalizeName(key)}
						value={propValue}
						onChange={val => onChange(id, { ...value, [key]: val })}
					/>
				))}
			</DebugPanel>
		);
	}
);
