import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import userReducer from '../features/user/UserSlice'
import tokenReducer from '../features/user/authSlice'
import {userAuthApi  } from '../services/userAuthApi'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const persistConfigs = {
  key: 'token_key',
  version: 1,
  storage,
}
const persistedReducer = persistReducer(persistConfig, userReducer)
const persistedReducers = persistReducer(persistConfigs, tokenReducer)


export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    user: persistedReducer,
    token: persistedReducers,
  },  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(userAuthApi.middleware),
})
