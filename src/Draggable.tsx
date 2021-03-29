import styled from '@emotion/styled';
import React, { PointerEvent, useState } from 'react';

const DragContainer = styled.div<{ x: number; y: number }>`
	position: absolute;
	top: ${props => props.y}px;
	left: ${props => props.x}px;
`;

export const Draggable: React.FC<{
	className?: string;
	position?: { x: number; y: number };
}> = ({ children, className, position: initialPosition }) => {
	const [position, setPosition] = useState(initialPosition ?? { x: 0, y: 0 });

	const onPointerDown = (ev: PointerEvent<HTMLDivElement>) => {
		const elem = ev.currentTarget;
		elem.setPointerCapture(ev.pointerId);
		ev.stopPropagation();
	};

	const onPointerUp = (ev: PointerEvent<HTMLDivElement>) => {
		const elem = ev.currentTarget;
		elem.releasePointerCapture(ev.pointerId);
	};

	const onPointerMove = (ev: PointerEvent<HTMLDivElement>) => {
		if (ev.currentTarget.hasPointerCapture(ev.pointerId)) {
			setPosition(prev => ({
				x: prev.x + ev.movementX,
				y: prev.y + ev.movementY,
			}));
		}
	};

	return (
		<DragContainer
			x={position.x}
			y={position.y}
			className={className}
			onPointerDown={onPointerDown}
			onPointerUp={onPointerUp}
			onPointerMove={onPointerMove}
		>
			{children}
		</DragContainer>
	);
};
