import For from '@controlComponents/For';
import { Signal } from '@preact/signals';
import { User } from '@store/AppProvider/state';
import './styles.css';
import { useAppDispatch } from '@store/AppProvider';

export default ({ users }: { users: Signal<User[]> }) => {
  console.log('UserList  mounted===>');

  const dispatch = useAppDispatch();

  const handleDelete = (id: number) => {
    console.log('delete user===>', id);

    dispatch({ type: 'delete_user', data: id });
  };

  const handleEdit = (user: User) => {
    console.log('edit user===>', user);

    dispatch({ type: 'edit_user', data: user });
  };

  return (
    <table>
      <caption>User List</caption>
      <thead>
        <tr>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <For each={users} keyExtractor={(user: User) => user.id}>
          {(user: User) => {
            return (
              <tr>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            );
          }}
        </For>
      </tbody>
    </table>
  );
};
