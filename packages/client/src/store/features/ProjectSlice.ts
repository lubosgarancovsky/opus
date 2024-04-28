import { Story } from '@/utils';
import { createSlice } from '@reduxjs/toolkit';

export const projectsSlice = createSlice({
  name: 'project',
  initialState: {
    project: null,
    stories: [] as Story[],
    collaborations: [],
    storyDetail: null
  },
  reducers: {
    project: (state, action) => {
      state.project = action.payload;
    },

    stories: (state, action) => {
      state.stories = action.payload;
    },

    collaborations: (state, action) => {
      state.collaborations = action.payload;
    },

    storyDetail: (state, action) => {
      state.storyDetail = action.payload;
    }
  }
});

export const { project, stories, collaborations, storyDetail } = projectsSlice.actions;

export default projectsSlice.reducer;
