import { createAction } from '@reduxjs/toolkit';
import { City, Offer } from '../types/offers';
import { AuthorizationStatus, AppRoute } from '../const';
import { UserData } from '../types/user-data';

export const changeCity = createAction<City>('CHANGE_CITY');
export const selectOffers = createAction<Offer[]>('SELECT_OFFERS');
export const changeSort = createAction<string>('CHANGE_SORT');
export const toggleSortsMenu = createAction('TOGGLE_SORTS_MENU');
export const resetSort = createAction('RESET_SORT');
export const loadOffers = createAction<Offer[]>('LOAD_OFFERS');
export const requireAuthorization = createAction<AuthorizationStatus>('REQUIRE_AUTHORIZATION');
export const setOffersDataLoadingStatus = createAction<boolean>('SET_QUESTIONS_DATA_LOADING_STATUS');
export const redirectToRoute = createAction<AppRoute>('REDIRECT_TO_ROUTE');
export const loadUserData = createAction<UserData>('LOAD_USER_DATA');
