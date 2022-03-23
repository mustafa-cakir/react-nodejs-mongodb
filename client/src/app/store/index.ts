import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import rootReducer from '../reducer';

// makeSure() is defined to make store creation common. We need `store` on;
// 1- Provider in the <App>, without preloadedState
// 2- Provider in the TestWrapper, with preloadedState
export const makeStore = (preloadedState?: any) =>
    configureStore({
        reducer: rootReducer,
        preloadedState,
    });

export const store = makeStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
