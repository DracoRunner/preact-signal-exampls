import { useAppDispatch } from '@store/AppProvider';
import './styles.css';

type props = {
  handleFormVisible: (isVisible: boolean) => void;
};

export default ({ handleFormVisible }: props) => {
  console.log('UserForm mounted===>');

  const dispatch = useAppDispatch();

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const user = Object.fromEntries(formData.entries());
    const userID = Math.floor(Math.random() * 1000) + 1;
    dispatch({ type: 'add_user', data: { id: userID, ...user } });
    handleFormVisible(false);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <ul className="flex-outer">
          <li>
            <label htmlFor="first_name">First Name</label>
            <input type="text" id="first_name" name="firstName" placeholder="Enter your first name here" required />
          </li>
          <li>
            <label htmlFor="last_name">Last Name</label>
            <input type="text" id="last_name" name="lastName" placeholder="Enter your last name here" required />
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email here" required />
          </li>
          <li>
            <label htmlFor="phone">Phone</label>
            <input type="number" id="phone" name="phoneNumber" placeholder="Enter your phone here" required />
          </li>
          <li>
            <button type="submit">Save</button>
          </li>
        </ul>
      </form>
    </div>
  );
};
