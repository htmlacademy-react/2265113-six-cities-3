import { createAction } from '@reduxjs/toolkit';
import { City, Offer } from '../types/offers';

export const changeCity = createAction<City>('CHANGE_CITY');
export const selectOffers = createAction<Offer[]>('SELECT_OFFERS');
