import { Signal } from "@preact/signals-core";

type UserProps = {
    user: {
        name: Signal<string>,
        email: Signal<string>,
        message: Signal<string>,
    } | {
        name: string,
        email: string,
        message: string,
    },
    handleUpdate: (key: string, value: string) => void
}


export const User = ({ user, handleUpdate }: UserProps) => {

    console.log("User====>");

    return <div>
        <p>{user.name}</p>
        <input placeholder="Name" onInput={(e: any) => handleUpdate('name', e.target.value)} />
        <p>{user.email}</p>
        <input placeholder="Email" onInput={(e: any) => handleUpdate('email', e.target.value)} />
        <p>{user.message}</p>
        <input placeholder="Message" onInput={(e: any) => handleUpdate('message', e.target.value)} />
    </div>
}