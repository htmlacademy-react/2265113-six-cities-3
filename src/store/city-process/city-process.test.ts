import { Cities } from '../../const';
import { changeCity, cityProcess } from './city-process';

describe('CityProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { city: Cities.HAMBURG };

    const result = cityProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = { city: Cities.PARIS };

    const result = cityProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should change city with "changeCity" action', () => {
    const initialState = { city: Cities.AMSTERDAM };
    const expectedState = { city: Cities.PARIS };

    const result = cityProcess.reducer(initialState, changeCity(expectedState.city));

    expect(result).toEqual(expectedState);
  });
});
