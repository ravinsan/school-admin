import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { profileSlice } from './profileReducer';

const persistConfig = {
  key:"root",
  storage,
}

 const persistedProfileReducer = persistReducer(persistConfig, profileSlice.reducer);

const store = configureStore({
  reducer:{
    profile:persistedProfileReducer,
  },
  middleware: (getDefaultMiddleware) =>
   getDefaultMiddleware({
    serializableCheck: {
     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
   },
  }),
});

export let persistor = persistStore(store);
export default store;


