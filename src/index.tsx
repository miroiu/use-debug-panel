import React from 'react';
import ReactDOM from 'react-dom';
import { DebugPanelProvider } from '@miroiu/use-debug-panel';
import { App } from './App';

ReactDOM.render(
	<React.StrictMode>
		<DebugPanelProvider>
			<App />
		</DebugPanelProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
