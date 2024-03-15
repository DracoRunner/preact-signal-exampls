import { Route, Router } from 'preact-router';

import AppProvider from '@store/AppProvider';
import VGrid from './routes/VGrid';
import Home from './routes/home/home';
import Users from './routes/users';
import './style/index.css';

export default function App() {
  return (
    <AppProvider>
      <div id="app">
        <Router>
          {/* <Route path="/" component={Home} /> */}
          <Route path="/users/" component={Users} />
          <Route path="/vgrid/" component={VGrid} />
        </Router>
      </div>
    </AppProvider>
  );
}
