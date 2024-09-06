import { createReducer } from '@reduxjs/toolkit';
import { Cities } from '../const.ts';
import { offers } from '../mocks/offers.ts';
import { City, Offer } from '../types/offers.ts';
import { changeCity, selectOffers } from './action.ts';

type State = {
  city: City;
  offers: Offer[];
};

const initialState: State = {
  city: Cities.PARIS,
  offers: offers
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(selectOffers, (state, action) => {
      state.offers = action.payload;
    });
});
