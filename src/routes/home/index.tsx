
import { Nav } from '@nimble/spatial-nav';
import { Priority, VirtualKeys, priorityQueueListeners } from '@nimble/virtual-key';
import { useNav } from '@store/NavigationProvider';
import { useEffect } from 'preact/hooks';
import './style.css';

export default function Home() {
	const nav = useNav();

	useEffect(() => {
		priorityQueueListeners.enqueue(async (keyName: VirtualKeys) => {
			console.log("keyName===>", keyName);
			nav.onKeyEvent(keyName);
		}, Priority.HIGH, "home");

		nav.assignFocus("item3");
		return () => {
			priorityQueueListeners.removeListenerById("home");
		}
	}, [nav]);

	return (
		<Nav.Horizontal id="root">
			<Nav.Focusable id="item1">
				<div className="item">Item1</div>
			</Nav.Focusable>
			<Nav.Focusable id="item2">
				<div className="item">Item2</div>
			</Nav.Focusable>
			<Nav.Focusable id="item3">
				<div className="item">Item3</div>
			</Nav.Focusable>
			<Nav.Focusable id="item4">
				<div className="item">Item4</div>
			</Nav.Focusable>
			<Nav.Focusable id="item5">
				<div className="item">Item5</div>
			</Nav.Focusable>
			<Nav.Focusable id="item6">
				<div className="item">Item6</div>
			</Nav.Focusable>
		</Nav.Horizontal>
	);
}
