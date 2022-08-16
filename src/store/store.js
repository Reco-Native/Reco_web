import { configureStore } from "@reduxjs/toolkit";
import ComponentSlice from "./slice/componentSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { LoginAPI } from "./services/login";
import { UserSlice } from "./slice/user";


// export const store = configureStore({
//   reducer: {
//     component: ComponentSlice,
//     devTools: process.env.NODE_ENV === "development",
//   },

//   // Add your middleware here
//   // ...
// });



export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [LoginAPI.reducerPath]: LoginAPI.reducer,
    devTools: process.env.NODE_ENV === "development",
    component: ComponentSlice,
    user: UserSlice,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(LoginAPI.middleware),
  
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
