import { Cities, NameSpace } from '../../const';
import { selectCurrentCity } from './selectors';

describe('CityProcess selectors', () => {
  const state = {
    [NameSpace.City]: {
      city: Object.values(Cities)[Math.floor(Math.random() * Object.entries(Cities).length)]
    }
  };

  it('should return city from state', () => {
    const { city } = state[NameSpace.City];
    const result = selectCurrentCity(state);

    expect(result).toBe(city);
  });
});
