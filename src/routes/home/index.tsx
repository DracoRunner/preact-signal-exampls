
import { Nav } from '@nimble/spatial-nav';
import { Priority, VirtualKeys, priorityQueueListeners } from '@nimble/virtual-key';
import { useNav } from '@store/NavigationProvider';
import { useEffect } from 'preact/hooks';
import './style.css';

const data = { data1: ["item1", "item2", "item3"], data2: ["item4", "item5", "item6"] };

export default function Home() {
	const nav = useNav();

	useEffect(() => {
		priorityQueueListeners.enqueue(async (keyName: VirtualKeys) => {
			nav.onKeyEvent(keyName);
		}, Priority.HIGH, "home");
		nav.assignFocus("root")
		return () => {
			priorityQueueListeners.removeListenerById("home");
		}
	}, [nav]);

	return (
		<div className="flex-container">
			<Nav.Vertical id="root" onFocusWithinChange={(event: any) => console.log(event)}>
				{Object.keys(data).map((key) => (
					<div className="flex-row" key={key}>
						<Nav.Horizontal id={key + 2} onFocusWithinChange={(event: any) => console.log(event)}>
							{data[key].map((item, index) => (
								<div className="flex-col" key={item}>
									<Nav.Focusable id={item + 2}>
										<div className="box">{item + index}</div>
									</Nav.Focusable>
								</div>
							))}
						</Nav.Horizontal>
					</div>
				))}
			</Nav.Vertical>
			<Nav.Vertical id="root1" onFocusWithinChange={(event: any) => console.log(event)}>
				{Object.keys(data).map((key) => (
					<div className="flex-row" key={key}>
						<Nav.Horizontal id={key} onFocusWithinChange={(event: any) => console.log(event)}>
							{data[key].map((item, index) => (
								<div className="flex-col" key={item + index}>
									<Nav.Focusable id={item + 2}>
										<div className="box">{item + index}</div>
									</Nav.Focusable>
								</div>
							))}
						</Nav.Horizontal>
					</div>
				))}
			</Nav.Vertical>
		</div >
	);
}
