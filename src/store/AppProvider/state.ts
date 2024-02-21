import { DeepSignal, deepSignal } from "deepsignal"
import { createContext } from "preact"

type G<T> = {
    updateState?: (object: T) => void
    updateProps?: (key: string, value: unknown) => void
}

export type User = {
    userEmail: string
    userName: string
    userPassword: string
}

export type AppState = {
    login: boolean,
    loader: boolean
    user?: User
}

export const appState = deepSignal<AppState & G<AppState>>({
    login: false,
    loader: false,
    updateProps: (key, value) => Object.assign(appState, { ...appState, [key]: value })
})

export const dispatch = ({ type, data }: { type: string, data: unknown }): void => {
    switch (type) {
        case "login": {
            appState.updateProps("login", true)
            return
        }
        case "user": {
            appState.updateProps("user", data)
            return
        }
        default: {
            appState.updateProps("loader", false)
        }
    }
}

export const AppGetterContext = createContext<DeepSignal<AppState>>(appState);

export const AppSetterContext = createContext(dispatch);