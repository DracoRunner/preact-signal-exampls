
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
			<Nav.Vertical id="root">
				{Object.keys(data).map((key) => (
					<div className="flex-row">
						<Nav.Horizontal id={key}>
							{data[key].map((item, index) => (
								<div class="flex-col">
									<Nav.Focusable id={item}>
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
