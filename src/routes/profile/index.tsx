import { useAppStore } from '@store/AppProvider';
import UserFrom from './components/UserFrom';
import UserProfileInfo from './components/UserProfileInfo';
import Show from '@controlComponents/Show';
import './style.css';

export default () => {
  console.log('Profile mounted===>');

  const appState = useAppStore();

  return (
    <div className="parent">
      <Show when={appState.$user}>
        <UserProfileInfo user={appState.$user} />
      </Show>
      <UserFrom />
    </div>
  );
};
