import { createSelector } from '@reduxjs/toolkit';
import { State, OffersData } from '../../types/state';
import { NameSpace } from '../../const';

export const selectOffers = createSelector(
  (state: State) => state[NameSpace.Offers],
  (state: OffersData) => state.offers
);

export const selectSortOffers = createSelector(
  (state: State) => state[NameSpace.Offers],
  (state: OffersData) => state.sortOffers
);

export const selectCurrentOffer = createSelector(
  (state: State) => state[NameSpace.Offers],
  (state: OffersData) => state.currentOffer
);

export const selectIsOffersDataLoading = createSelector(
  (state: State) => state[NameSpace.Offers],
  (state: OffersData) => state.isOffersDataLoading
);

export const selectFavoriteOffers = createSelector(
  (state: State) => state[NameSpace.Offers],
  (state: OffersData) => state.favoriteOffers
);

export const selectNearestOffers = createSelector(
  (state: State) => state[NameSpace.Offers],
  (state: OffersData) => state.nearestOffers
);
