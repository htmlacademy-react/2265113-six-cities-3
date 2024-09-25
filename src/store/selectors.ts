import { State } from '../types/state';

export const selectOffers = (state: State) => state.offers;

export const selectCurrentCity = (state: State) => state.city;

export const selectSortOffers = (state: State) => state.sortOffers;

export const selectIsFiltersOpen = (state: State) => state.isFiltersOpen;

export const selectUserData = (state: State) => state.user;

export const selectAuthorizationStatus = (state: State) => state.authorizationStatus;

export const selectCurrentOffer = (state: State) => state.currentOffer;

export const selectComments = (state: State) => state.comments;

export const selectIsOffersDataLoading = (state: State) => state.isOffersDataLoading;

export const selectFavoriteOffers = (state: State) => state.favoriteOffers;

export const selectNearestOffers = (state: State) => state.nearestOffers;
