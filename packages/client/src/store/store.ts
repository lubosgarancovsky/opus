import { configureStore } from '@reduxjs/toolkit';
import projectSlice from './features/ProjectSlice';
import boardSlice from './features/BoardSlice';

export default configureStore({
  reducer: {
    project: projectSlice,
    board: boardSlice
  }
});
