import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/AuthSlice';

const rootReducers = combineReducers({
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducers,
});

export type RootState = ReturnType<typeof rootReducers>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
