import { createSlice } from '@reduxjs/toolkit';

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    dragged: null,
    isDragging: false,
    position: { x: 0, y: 0 }
  },
  reducers: {
    startDragging: (state, action) => {
      state.isDragging = true;
      state.dragged = action.payload;
    },
    stopDragging: (state, action) => {
      state.isDragging = false;
      state.position = action.payload;
    },
    drop(state) {
      state.dragged = null;
      state.position = { x: 0, y: 0 };
    },
    position(state, action) {
      state.position = action.payload;
    }
  }
});

export const { startDragging, stopDragging, drop, position } = boardSlice.actions;

export default boardSlice.reducer;
