import { createAction } from '@reduxjs/toolkit';
import { City, Offer } from '../types/offers';

export const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  SELECT_OFFERS: 'SELECT_OFFERS'
};

export const changeCity = createAction(Action.CHANGE_CITY, (selectedCity: City) => ({
  payload: selectedCity
}));

export const selectOffers = createAction(Action.SELECT_OFFERS, (currentOffers: Offer[]) => ({
  payload: currentOffers
}));
