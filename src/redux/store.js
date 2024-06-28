import {
  REHYDRATE,
  REGISTER,
  PURGE,
  persistStore,
  PAUSE,
  persistReducer,
  FLUSH,
  PERSIST,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { contReduc } from "./contacts/slice";
import { filtersReducer } from "./filter/slice";
import { authReducer } from "./auth/slice";

const authPersConf = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersConf, authReducer),
    contacts: contReduc,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REHYDRATE, REGISTER, PURGE, PAUSE, FLUSH, PERSIST],
      },
    }),
});

export const persistor = persistStore(store);
