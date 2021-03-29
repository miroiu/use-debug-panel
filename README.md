# use-debug-panel

> useDebugPanel provides a panel where you can modify properties of an object

[![NPM](https://img.shields.io/npm/v/@miroiu/use-debug-panel.svg)](https://www.npmjs.com/package/@miroiu/use-debug-panel)

[![Example](https://i.imgur.com/KhtlkkR.png)](Example)

## Install

```bash
npm install --save-dev @miroiu/use-debug-panel
```

## Usage

```tsx
import React from 'react';
import {
	DebugPanelProvider,
	makeSlider,
	makeColor,
	useDebugPanel,
} from '@miroiu/use-debug-panel';

const App: React.FC = () => {
	const { string, slider } = useDebugPanel(
		{
			number: 1,
			string: 'text',
			boolean: true,
			date: new Date(),
			slider: makeSlider(10),
			color: makeColor('#00aaff'),
			array: [1, 2, 4, 5],
			object: {},
			undefined: undefined,
			null: null,
		},
		'Optional Title'
	);

	return (
		<div>
			{string}: {slider.value}
		</div>
	);
};

ReactDOM.render(
	<DebugPanelProvider>
		<App />
	</DebugPanelProvider>,
	document.getElementById('root')
);
```

## License

MIT © [miroiu](https://github.com/miroiu)
