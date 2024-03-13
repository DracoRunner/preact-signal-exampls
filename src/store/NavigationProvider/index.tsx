import { NavProvider } from '@nimble/spatial-nav';
import { NavigationContext, nav } from './state';
import { useContext } from 'preact/hooks';

export const useNav = () => {
  return useContext(NavigationContext);
};

export default ({ children }) => (
  <NavProvider nav={nav}>
    <NavigationContext.Provider value={nav}>{children}</NavigationContext.Provider>
  </NavProvider>
);
