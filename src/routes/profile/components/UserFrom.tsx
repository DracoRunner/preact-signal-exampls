import { useAppDispatch } from '@store/AppProvider';

export default () => {
  console.log('UserForm mounted===>');

  const dispatch = useAppDispatch();

  const handleFormSubmit = (event: Event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const user = Object.fromEntries(formData.entries());
    dispatch({ type: 'user', data: user });
  };

  return (
    <div className="container">
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="user_name"> Name </label>
        <input id="user_name" type="text" name="userName" placeholder="User name" />
        <label htmlFor="user_email"> Email </label>
        <input id="user_email" placeholder="Email" type="text" name="userEmail" />
        <label htmlFor="user_password"> Password </label>
        <input id="user_password" placeholder="Password" type="password" name="userPassword" />
        <input type="submit" name="submit" value="Submit" />
      </form>
    </div>
  );
};
