import { SpatialNavigation } from "@nimble/spatial-nav"
import { createContext } from "preact"


export const nav = new SpatialNavigation()

export const NavigationContext = createContext(nav)

