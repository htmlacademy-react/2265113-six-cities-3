import { createSelector } from '@reduxjs/toolkit';
import { State, CommentsData } from '../../types/state';
import { NameSpace } from '../../const';

export const selectComments = createSelector(
  (state: Pick<State, NameSpace.Comments>) => state[NameSpace.Comments],
  (state: CommentsData) => state.comments
);
