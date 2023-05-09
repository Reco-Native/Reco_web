import { configureStore } from '@reduxjs/toolkit';
import ComponentSlice from './slice/componentSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import login from './slice/loginSlice';
import message from './slice/messageSlice';
import currencySlice from './slice/currencySlice';
import categorySlice from './slice/categorySlice';
import giftCardSlice from './slice/giftCardslice';
import { UserSlice } from './slice/user';
import transactionSlice from './slice/transactionSlice';
export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice

    devTools: process.env.NODE_ENV === 'development',
    component: ComponentSlice,
    user: UserSlice,
    login: login,
    message: message,
    currency: currencySlice,
    category: categorySlice,
    giftcard: giftCardSlice,
    transaction: transactionSlice,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
