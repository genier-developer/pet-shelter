// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import {petReducer} from '../features/petSlice';

export const store = configureStore({
  reducer: {
    pet: petReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
