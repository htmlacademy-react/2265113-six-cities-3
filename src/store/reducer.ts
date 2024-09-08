import { createReducer } from '@reduxjs/toolkit';
import { Cities, Sorts } from '../const.ts';
import { offers } from '../mocks/offers.ts';
import { City, Offer } from '../types/offers.ts';
import { changeCity, selectOffers, changeSort, toggleSortsMenu, resetSort } from './action.ts';
import { sortOffers } from '../utils/sort.ts';

type State = {
  city: City;
  offers: Offer[];
  sortOffers: string;
  isFiltersOpen: boolean;
};

const initialState: State = {
  city: Cities.PARIS,
  offers: offers,
  sortOffers: Sorts.POPULAR,
  isFiltersOpen: false
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(selectOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeSort, (state, action) => {
      state.sortOffers = action.payload;
      state.offers = sortOffers[action.payload]([...offers]);
    })
    .addCase(toggleSortsMenu, (state) => {
      state.isFiltersOpen = !state.isFiltersOpen;
    })
    .addCase(resetSort, (state) => {
      state.sortOffers = Sorts.POPULAR;
    });
});
