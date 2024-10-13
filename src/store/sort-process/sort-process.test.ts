import { toggleSortsMenu, sortProcess } from './sort-process';

describe('SortProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const initialState = { isFiltersOpen: false };

    const result = sortProcess.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const initialState = { isFiltersOpen: false };

    const result = sortProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should toggle sorts menu with "toggleSortsMenu" action', () => {
    const initialState = { isFiltersOpen: false };
    const expectedState = { isFiltersOpen: true };

    const result = sortProcess.reducer(initialState, toggleSortsMenu);

    expect(result).toEqual(expectedState);
  });
});
