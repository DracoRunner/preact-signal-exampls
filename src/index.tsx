import { Route, Router } from 'preact-router';

import Home from './routes/home';
import Profile from './routes/profile';
import './style/index.css';
import AppProvider from '@store/AppProvider';

export default function App() {
	return (
		<AppProvider>
			<div id="app">
				<Router>
					<Route path="/" component={Home} />
					<Route path="/profile/" component={Profile} user="me" />
					<Route path="/profile/:user" component={Profile} />
				</Router>
			</div>
		</AppProvider>

	);
}
