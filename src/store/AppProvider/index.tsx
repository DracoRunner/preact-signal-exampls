import NavigationProvider from '@store/NavigationProvider';
import { useContext } from 'preact/hooks';
import { AppGetterContext, AppSetterContext, appState, dispatch } from './state';
import { StoreProvider } from './store';

export const useAppStore = () => {
  return useContext(AppGetterContext);
};

export const useAppDispatch = () => {
  return useContext(AppSetterContext);
};

export default ({ children }) => {
  return (
    <StoreProvider>
      <NavigationProvider>
        <AppGetterContext.Provider value={appState}>
          <AppSetterContext.Provider value={dispatch}>{children}</AppSetterContext.Provider>
        </AppGetterContext.Provider>
      </NavigationProvider>
    </StoreProvider>
  );
};
