import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, Sorts } from '../../const';
import { OffersData } from '../../types/state';
import { fetchCurrentOfferAction, fetchFavoriteOffersAction, fetchNearestOfferAction, fetchOffersAction, updateOfferFavoriteStatusAction } from '../api-actions';
import { sortOffers } from '../../utils/sort';

const initialState: OffersData = {
  offers: [],
  favoriteOffers: [],
  currentOffer: null,
  nearestOffers: [],
  isOffersDataLoading: false,
  sortOffers: Sorts.POPULAR,
  activeOfferId: null
};

export const offerData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    changeSort: (state, action: PayloadAction<string>) => {
      state.offers = sortOffers[action.payload]([...state.offers]);
      state.sortOffers = action.payload;
    },
    resetSort: (state) => {
      state.sortOffers = Sorts.POPULAR;
    },
    changeActiveOfferId: (state, action: PayloadAction<string | null>) => {
      state.activeOfferId = action.payload;
    },
    resetCurrentOffer: (state) => {
      state.currentOffer = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchCurrentOfferAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchCurrentOfferAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchNearestOfferAction.fulfilled, (state, action) => {
        state.nearestOffers = action.payload;
      })
      .addCase(updateOfferFavoriteStatusAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.favoriteOffers = action.payload.filter((offer) => offer.isFavorite === true);
      });
  }
});

export const { changeSort, resetSort, changeActiveOfferId, resetCurrentOffer } = offerData.actions;
