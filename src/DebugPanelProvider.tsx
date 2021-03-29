import React, { useState, useCallback, createContext } from 'react';
import { createPortal } from 'react-dom';
import { SmartDebugPanel } from './DebugPanel';

export type DebugPanelContextType = {
	createPanel: <T extends object>(value: T, title?: string) => number;
	removePanel: (id: number) => void;
	getResult: <T extends object>(panelId: number) => T;
};

export const DebugPanelContext = createContext<DebugPanelContextType>(
	{} as any
);

type PanelType = {
	id: number;
	title: string;
	result: object;
	position: { x: number; y: number };
};

let __DBG_PANEL_ID = 0;
export const DebugPanelProvider: React.FC = ({ children }) => {
	const [panels, setPanels] = useState<PanelType[]>([]);

	const createPanel = useCallback(
		<T extends object>(value: T, title?: string) => {
			++__DBG_PANEL_ID;

			const id = __DBG_PANEL_ID;
			setPanels(prev => {
				return [
					...prev,
					{
						id: id,
						title: title ?? 'useDebugPanel',
						result: { ...value },
						position: {
							x: 30 * id,
							y: 30 * id,
						},
					},
				];
			});
			return id;
		},
		[]
	);

	const removePanel = useCallback(
		(id: number) =>
			setPanels(prev => prev.filter(panel => panel.id !== id)),
		[]
	);

	const getResult = useCallback(
		<T extends object>(panelId: number) => {
			const filtered = panels.filter(panel => panel.id === panelId);

			if (filtered.length === 0) {
				throw new Error(`DebugPanel#${panelId} does not exist`);
			}

			return filtered[0].result as T;
		},
		[panels]
	);

	const updateResult = useCallback((panelId: number, value: object) => {
		setPanels(prev => {
			const filtered = prev.filter(panel => panel.id === panelId);

			if (filtered.length === 0) {
				throw new Error(`DebugPanel#${panelId} does not exist`);
			}

			return [
				...prev.filter(panel => panel.id !== panelId),
				{ ...filtered[0], result: value },
			];
		});
	}, []);

	return (
		<DebugPanelContext.Provider
			value={{ createPanel, removePanel, getResult }}
		>
			{panels.map(panel =>
				createPortal(
					<SmartDebugPanel
						id={panel.id}
						value={panel.result}
						position={panel.position}
						title={panel.title}
						onChange={updateResult}
					/>,
					document.body,
					panel.id.toString()
				)
			)}
			{children}
		</DebugPanelContext.Provider>
	);
};
