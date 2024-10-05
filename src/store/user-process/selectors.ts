import { createSelector } from '@reduxjs/toolkit';
import { State, UserProcess } from '../../types/state';
import { NameSpace } from '../../const';

export const selectUserData = createSelector(
  (state: State) => state[NameSpace.User],
  (state: UserProcess) => state.user
);

export const selectAuthorizationStatus = createSelector(
  (state: State) => state[NameSpace.User],
  (state: UserProcess) => state.authorizationStatus
);
