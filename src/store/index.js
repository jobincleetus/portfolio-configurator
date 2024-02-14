import { combineReducers, configureStore } from '@reduxjs/toolkit'
import libraryReducer from './library'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({ library: libraryReducer });

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({ 
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
 }); // Pass the reducer to configureStore directly
const persistor = persistStore(store);

export { store, persistor };