import { createContext, StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import UserStore from "./store/UserStore.ts";
import DeviceStore from "./store/DeviceStore.ts";

interface Store {
  user: UserStore;
  device: DeviceStore;
}

export const Context = createContext<Store>({
  user: new UserStore(),
  device: new DeviceStore(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Context.Provider
      value={{
        user: new UserStore(),
        device: new DeviceStore(),
      }}
    >
      <App />
    </Context.Provider>
  </StrictMode>
);
