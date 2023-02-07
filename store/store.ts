import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { useDispatch } from 'react-redux';
import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export const wrapper = createWrapper(() => store);
export const store_0001 = store;
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch();