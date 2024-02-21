
import { withDeepsignal } from "@hoc/withDeepsignal";
import { User } from "@store/AppProvider/state";
import { DeepSignal } from "deepsignal";


export default withDeepsignal(({ user }: { user: DeepSignal<User> }) => {

    console.log("UserProfileInfo  mounted===>");

    return <div className="container">
        <span>name: {user.$userName}</span>
        <br />
        <span>email: {user.$userEmail}</span>
        <br />
        <span>password: {user.$userPassword}</span>
        <br />
        <br />
    </div>
});
