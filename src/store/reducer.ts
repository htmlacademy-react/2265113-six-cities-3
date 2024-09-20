import { createReducer } from '@reduxjs/toolkit';
import { Cities, Sorts, AuthorizationStatus } from '../const.ts';
import { City, Offer } from '../types/offers.ts';
import { changeCity, selectOffers, changeSort, toggleSortsMenu, resetSort, loadOffers, requireAuthorization, setOffersDataLoadingStatus, loadUserData } from './action.ts';
import { sortOffers } from '../utils/sort.ts';
import { UserData } from '../types/user-data.ts';

type State = {
  city: City;
  offers: Offer[];
  sortOffers: string;
  isFiltersOpen: boolean;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  user: UserData | null;
};

const initialState: State = {
  city: Cities.PARIS,
  offers: [],
  sortOffers: Sorts.POPULAR,
  isFiltersOpen: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  user: null
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
      state.offers = sortOffers[action.payload]([...state.offers]);
    })
    .addCase(toggleSortsMenu, (state) => {
      state.isFiltersOpen = !state.isFiltersOpen;
    })
    .addCase(resetSort, (state) => {
      state.sortOffers = Sorts.POPULAR;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(loadUserData, (state, action) => {
      state.user = action.payload;
    });
});
