import React from 'react';
import { makeSlider, makeColor, useDebugPanel } from '@miroiu/use-debug-panel';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { demos } from './demos';
import styled from '@emotion/styled';

const StyledEditor = styled.div`
	background: #27282b;
	font-family: 'Source Code Pro', monospace;
	font-size: 14px;
	overflow: auto;
	* > textarea:focus {
		outline: none;
	}
`;

const StyledPreview = styled(LivePreview)`
	position: relative;
	padding: 0.5rem;
	background: white;
	color: black;
	height: auto;
	overflow: hidden;
`;

const StyledError = styled(LiveError)`
	display: block;
	padding: 8px;
	background: #491821;
	color: white;
	white-space: pre-wrap;
	text-align: left;
	font-size: 0.9em;
	font-family: 'Source Code Pro', monospace;
`;

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-column-gap: 20px;
	grid-row-gap: 50px;
	max-width: 1600px;
	margin: 0 auto;

	@media (max-width: 600px) {
		grid-template-columns: auto;
		grid-row-gap: 50px;
	}
`;

export const App: React.FC = () => {
	return (
		<Wrapper>
			{demos.map((demo, index) => (
				<LiveProvider
					key={index}
					scope={{ useDebugPanel, makeSlider, makeColor }}
					code={demo}
					noInline={true}
				>
					<StyledEditor>
						<LiveEditor />
						<StyledError />
					</StyledEditor>
					<StyledPreview />
				</LiveProvider>
			))}
		</Wrapper>
	);
};
