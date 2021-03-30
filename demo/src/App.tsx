import React from 'react';
import { makeSlider, makeColor, useDebugPanel } from '@miroiu/use-debug-panel';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { demos } from './demos';
import styled from '@emotion/styled/macro';

const StyledEditor = styled.div`
	background: #27282b;
	color: white;
	font-family: 'Source Code Pro', monospace;
	font-size: 14px;
	overflow: auto;
	border-right: 2px solid white;
	* > textarea:focus {
		outline: none;
	}
	@media (max-width: 600px) {
		border-right: none;
		border-bottom: 2px solid white;
	}
`;

const StyledPreview = styled(LivePreview)`
	position: relative;
	padding: 0.5rem;
	background-color: #21242e;
	border-left: 10px solid white;
	color: white;
	height: auto;
	overflow: hidden;
	@media (max-width: 600px) {
		border-left: none;
		border-top: 10px solid white;
	}
	min-height: 200px;
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

const GridWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-column-gap: 20px;
	grid-row-gap: 50px;

	@media (max-width: 600px) {
		grid-template-columns: auto;
		grid-row-gap: 50px;
	}
`;

const Button = styled.a`
	position: relative;
	display: inline-block;
	text-decoration: none;
	text-align: center;
	cursor: pointer;
	user-select: none;
	color: #abddff;
	transition: all 0.2s;
	font-family: 'Source Code Pro', monospace;
	font-size: 1.1rem;
	font-weight: bold;
	letter-spacing: 0.01em;
	padding: 1em 2em;
	border-left: 2px solid dodgerblue;
	border-radius: 0 0 0 7px;

	&:hover {
		padding: 1em 2.2em;
		color: white;
	}
`;

const NavBar = styled.nav`
	background-color: #27282b;
	border-bottom: 5px solid dodgerblue;
	border-radius: 0 0 5px 5px;
	min-height: 70px;
	margin-bottom: 50px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 5px 20px;

	@media (max-width: 600px) {
		flex-direction: column;
		${Button} {
			border: none;
		}
	}
`;

const Main = styled.main`
	max-width: 1600px;
	margin: 0 auto;
`;

const Title = styled.h1`
	color: white;
	font-family: 'Source Code Pro', monospace;
	font-size: 1.3rem;
	font-weight: bold;
`;

export const App: React.FC = () => {
	return (
		<Main>
			<NavBar>
				<Title>useDebugPanel</Title>
				<div>
					<Button href="https://github.com/miroiu/use-debug-panel">
						GitHub
					</Button>
					<Button href="https://www.npmjs.com/package/@miroiu/use-debug-panel">
						npm
					</Button>
				</div>
			</NavBar>
			<GridWrapper>
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
			</GridWrapper>
		</Main>
	);
};
