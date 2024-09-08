import { createAction } from '@reduxjs/toolkit';
import { City, Offer } from '../types/offers';

export const changeCity = createAction<City>('CHANGE_CITY');
export const selectOffers = createAction<Offer[]>('SELECT_OFFERS');
export const changeSort = createAction<string>('CHANGE_SORT');
export const toggleSortsMenu = createAction('TOGGLE_SORTS_MENU');
export const resetSort = createAction('RESET_SORT');
