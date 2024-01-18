import { useState } from "preact/hooks";
import { User } from "./User";

const UserWithState = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        message: '',
    })

    const handleUpdate = (key: string, value: string) => {
        setUser((prev => ({ ...prev, [key]: value })))
    }

    return <User user={user} handleUpdate={handleUpdate}></User>
}

export default UserWithState
