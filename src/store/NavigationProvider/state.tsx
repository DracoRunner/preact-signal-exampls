import { SpatialNavigation } from "@nimble/spatial-nav";
import { init } from "@nimble/virtual-key";
import { createContext } from "preact";

init(document);
export const nav = new SpatialNavigation()

export const NavigationContext = createContext(nav)

