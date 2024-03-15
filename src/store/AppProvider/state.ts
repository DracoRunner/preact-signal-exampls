import { computed, useComputed } from '@preact/signals';
import { DeepSignal, deepSignal } from 'deepsignal';
import { createContext } from 'preact';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
};

export type AppState = {
  login: boolean;
  loader: boolean;
  users: User[];
};

type AppStateSetter<T> = {
  updateProps?: (key: string, value: unknown) => void;
  editUser: (user: User) => void;
  deleteUser: (id: number) => User[];
  addUser: (user: User) => User[];
};

export const appState = deepSignal<AppState & AppStateSetter<AppState>>({
  login: false,
  loader: false,
  users: [],
  updateProps: (key, value) => Object.assign(appState, { ...appState, [key]: value }),
  editUser: (user) => appState.users.map((u) => (u.id === user.id ? user : u)),
  deleteUser: (id) => appState.users.filter((user) => user.id !== id),
  addUser: (user) => appState.users.push(user),
});

export const dispatch = ({ type, data }: { type: string; data: unknown }): void => {
  switch (type) {
    case 'login': {
      appState.updateProps('login', true);
      return;
    }
    case 'add_user': {
      appState.addUser(data as User);
      return;
    }
    case 'delete_user': {
      const users = appState.deleteUser(data as number);
      appState.updateProps('users', users);
      return;
    }
    case 'edit_user': {
      const users = appState.editUser(data as User);
      appState.updateProps('users', users);
      return;
    }
    default: {
      appState.updateProps('loader', false);
    }
  }
};

export const AppGetterContext = createContext<DeepSignal<AppState>>(appState);

export const AppSetterContext = createContext(dispatch);
