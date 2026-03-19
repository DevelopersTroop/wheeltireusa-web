import { combineReducers, configureStore } from '@reduxjs/toolkit';
import mailFilterReducer from './features/mainFilterSlice';
import userReducer from './features/userSlice';
import checkoutReducer from './features/checkoutSlice';
import cartReducer from './features/cartSlice';
import packageReducer from './features/packageSlice';
import newsletterModalReducer from './features/newsletterModalSlice';
import yearMakeModelReducer from './features/yearMakeModelSlice';
import ymmFilterReducer from './features/ymmFilterSlice';

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
// @ts-ignore need not check typescript for this indexdb storage: storage("yearMakeModelWTU")
import storage from 'redux-persist-indexeddb-storage';
import { baseApi } from './apis/base';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { checkoutListenerMiddleware } from './middleware/checkoutMiddleware';
import { cartListenerMiddleware } from './middleware/cartListener';
import comparisonReducer from './features/comparisonSlice';
import wheelReducer from './features/wheel';
import layoutReducer from './features/layoutSlice';

const rootPersistConfig = {
  key: 'wheel-tire-usa-store',
  storage: storage('wheelTireUSADB'),
};

// Persist only garage-related fields from yearMakeModel
const ymmPersistConfig = {
  key: 'yearMakeModel',
  storage: storage("yearMakeModelWTU"),
  whitelist: ['garage', 'activeGarageId'],
};

// Register reducers that's need to be persisted
const persistingReducer = combineReducers({
  user: userReducer,
  checkout: checkoutReducer,
  cart: cartReducer,
  package: packageReducer,
  newsletterModal: newsletterModalReducer,
  comparison: comparisonReducer,
  layout: layoutReducer,
  yearMakeModel: persistReducer(ymmPersistConfig, yearMakeModelReducer),
});

const persistedReducer = persistReducer(rootPersistConfig, persistingReducer);

// Register reducers that's not need to be persisted
const rootReducer = combineReducers({
  persisted: persistedReducer,
  mainFilter: mailFilterReducer,
  ymmFilter: ymmFilterReducer,
  [baseApi.reducerPath]: baseApi.reducer,
  wheel: wheelReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(baseApi.middleware)
      .concat(checkoutListenerMiddleware.middleware)
      .concat(cartListenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();
