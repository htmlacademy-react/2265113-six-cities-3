import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { SortProcess } from '../../types/state';

const initialState: SortProcess = {
  isFiltersOpen: false
};

export const sortProcess = createSlice({
  name: NameSpace.Sort,
  initialState,
  reducers: {
    toggleSortsMenu: (state) => {
      state.isFiltersOpen = !state.isFiltersOpen;
    }
  }
});

export const { toggleSortsMenu } = sortProcess.actions;
