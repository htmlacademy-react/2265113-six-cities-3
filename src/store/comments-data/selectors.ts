import { createSelector } from '@reduxjs/toolkit';
import { State, CommentsData } from '../../types/state';
import { NameSpace } from '../../const';

export const selectComments = createSelector(
  (state: State) => state[NameSpace.Comments],
  (state: CommentsData) => state.comments
);
