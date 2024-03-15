import { useContext } from 'preact/hooks';
import { AppGetterContext, AppSetterContext, appState, dispatch } from './state';

export const useAppStore = () => {
  return useContext(AppGetterContext);
};

export const useAppDispatch = () => {
  return useContext(AppSetterContext);
};

export default ({ children }) => {
  return (
    <AppGetterContext.Provider value={appState}>
      <AppSetterContext.Provider value={dispatch}>{children}</AppSetterContext.Provider>
    </AppGetterContext.Provider>
  );
};
