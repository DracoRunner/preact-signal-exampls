import { StoreProvider } from '@store/AppProvider/store';
import NavigationProvider from '@store/NavigationProvider';
import Home from './home';

export default () => (
  <StoreProvider>
    <NavigationProvider>
      <Home />
    </NavigationProvider>
  </StoreProvider>
);
