import { createSelector } from '@reduxjs/toolkit';
import { State, CityProcess } from '../../types/state';
import { NameSpace } from '../../const';

export const selectCurrentCity = createSelector(
  (state: State) => state[NameSpace.City],
  (state: CityProcess) => state.city
);
