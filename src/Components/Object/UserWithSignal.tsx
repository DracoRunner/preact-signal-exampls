import { DeepSignal, deepSignal } from "deepsignal";

type UserProps = {
    user: DeepSignal<{
        name: string;
        email: string;
        message: string;
    }>,
    handleUpdate: (key: string, value: string) => void
}

const UserWithSignals = () => {

    const userSignal = deepSignal({
        name: '',
        email: '',
        message: '',
        update:(object:any)=>Object.assign(userSignal, object)
    })

    const handleUpdate = (key: string, value: string) => {
        userSignal[key] = value
    }

    const updateRandomUser = () => {
        userSignal.update({ name: "mahi", email: "mahi", message: "mahi" })
    }

    return <>
        <User user={userSignal} handleUpdate={handleUpdate}></User>
        <button onClick={updateRandomUser}>Update Random</button>
    </>
}

export const User = ({ user, handleUpdate }: UserProps) => {

    console.log("User====>");

    return <div>
        <p>{user.$name}</p>
        <input placeholder="Name" onInput={(e: any) => handleUpdate('name', e.target.value)} />
        <p>{user.$email}</p>
        <input placeholder="Email" onInput={(e: any) => handleUpdate('email', e.target.value)} />
        <p>{user.$message}</p>
        <input placeholder="Message" onInput={(e: any) => handleUpdate('message', e.target.value)} />
    </div>
}

export default UserWithSignals;
