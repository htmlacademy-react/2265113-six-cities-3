import { createSelector } from '@reduxjs/toolkit';
import { State, OffersData } from '../../types/state';
import { NameSpace } from '../../const';

export const selectOffers = createSelector(
  (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers],
  (state: OffersData) => state.offers
);

export const selectSortOffers = createSelector(
  (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers],
  (state: OffersData) => state.sortOffers
);

export const selectCurrentOffer = createSelector(
  (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers],
  (state: OffersData) => state.currentOffer
);

export const selectIsOffersDataLoading = createSelector(
  (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers],
  (state: OffersData) => state.isOffersDataLoading
);

export const selectFavoriteOffers = createSelector(
  (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers],
  (state: OffersData) => state.favoriteOffers
);

export const selectNearestOffers = createSelector(
  (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers],
  (state: OffersData) => state.nearestOffers
);

export const selectActiveOfferId = createSelector(
  (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers],
  (state: OffersData) => state.activeOfferId
);
