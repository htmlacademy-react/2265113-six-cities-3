import { useRef } from 'react';
import { Cities } from '../const';
import { useMap } from './use-map';
import { renderHook } from '@testing-library/react';

describe('Hook: useMap', () => {
  it('should return "Map | null" when mapRef "null"', () => {
    const { result } = renderHook(() => {
      const fakeMapRef = useRef<HTMLElement>(null);
      const fakeCity = Cities.PARIS;

      return useMap(fakeMapRef, fakeCity);
    });

    expect(result.current instanceof Map || result.current === null).toBe(true);
  });
});
