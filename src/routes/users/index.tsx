import { useAppStore } from '@store/AppProvider';
import UserList from './components/UserList';
import UserFrom from './components/userForm';
import './style.css';
import { useSignal } from '@preact/signals';
import Show from '@controlComponents/Show';

export default () => {
  console.log('Profile mounted===>');

  const formVisible = useSignal(false);

  const appState = useAppStore();

  const handleFormVisible = (isVisible: boolean) => {
    formVisible.value = isVisible;
  };

  return (
    <div className="parent">
      <div className="top-container">
        <button onClick={() => handleFormVisible(true)}>Create user</button>
      </div>
      <Show when={formVisible}>
        <UserFrom handleFormVisible={handleFormVisible} />
      </Show>
      <UserList users={appState.$users} />
    </div>
  );
};
