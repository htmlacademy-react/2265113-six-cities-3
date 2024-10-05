import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CommentsData } from '../../types/state';
import { fetchCommentsAction } from '../api-actions';

const initialState: CommentsData = {
  comments: []
};

export const commentsData = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
  }
});
