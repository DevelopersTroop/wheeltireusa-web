import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ymmReducer from "./features/ymm-slice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./apis/base";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
const rootPersistConfig = {
  key: "tirematic-store",
  storage,
};

// Register reducers that's need to be persisted
const persistingReducer = combineReducers({
  yearMakeModel: ymmReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, persistingReducer);

// Register reducers that's not need to be persisted
const rootReducer = combineReducers({
  persisted: persistedReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const persistor = persistStore(store);

export default store;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();
