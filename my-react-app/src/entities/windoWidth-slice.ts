import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

const windowSlice = createSlice({
  name: 'window',
  initialState: {
    width: window.innerWidth,  
  },
  reducers: {
    setWindowWidth: (state, action) => {
      state.width = action.payload;
    },
  },
});

export const { setWindowWidth } = windowSlice.actions;
export const windowReducer = windowSlice.reducer;

export const selectWindowWidth = (state: RootState) => state.window.width;
