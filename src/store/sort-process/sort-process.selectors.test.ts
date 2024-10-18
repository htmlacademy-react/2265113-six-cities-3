import { NameSpace } from '../../const';
import { selectIsFiltersOpen } from './selectors';

describe('SortProcess selectors', () => {
  const state = {
    [NameSpace.Sort]: {
      isFiltersOpen: false
    }
  };

  it('should return isFiltersOpen from state', () => {
    const { isFiltersOpen } = state[NameSpace.Sort];
    const result = selectIsFiltersOpen(state);

    expect(result).toBe(isFiltersOpen);
  });
});
