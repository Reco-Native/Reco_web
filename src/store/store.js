import { configureStore } from "@reduxjs/toolkit";
import ComponentSlice from "./slice/componentSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { loginUser } from "./services/login";
import { UserSlice } from "./slice/user";
import { createCard } from "./services/createCard";
import { createCurrency } from './services/createCurrency'
import { fetchCurrency } from "./services/fetchCurrency";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [loginUser.reducerPath]: loginUser.reducer,
    [createCard.reducerPath]: createCard.reducer,
    [createCurrency.reducerPath]: createCurrency.reducer,
    [fetchCurrency.reducerPath]: fetchCurrency.reducer,
    devTools: process.env.NODE_ENV === "development",
    component: ComponentSlice,
    user: UserSlice,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      loginUser.middleware,
      createCard.middleware,
      createCurrency.middleware,
      fetchCurrency.middleware,
    ]),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
