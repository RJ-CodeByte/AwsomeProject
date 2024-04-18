import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import RootReducer from './reducer';
import store from './store.index';

export type RootReducerType = ReturnType<typeof RootReducer>;
export type RootStoreState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppSelector = typeof store.getState;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootStoreState> = useSelector;

// https://react-redux.js.org/using-react-redux/usage-with-typescript#withtypes