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
    resetFavorites: (state) => {
      if (state.offers.length > 0) {
        const newOffers = [...state.offers];
        newOffers.forEach((offer) => {
          offer.isFavorite = false;
        });
        state.offers = newOffers;
      }

      state.favoriteOffers = [];
    },
    changeActiveOfferId: (state, action: PayloadAction<string | null>) => {
      state.activeOfferId = action.payload;
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
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
      })
      .addCase(fetchCurrentOfferAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchCurrentOfferAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchCurrentOfferAction.rejected, (state) => {
        state.isOffersDataLoading = false;
      })
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isOffersDataLoading = false;

        const newOffers = [...state.offers];
        state.favoriteOffers.forEach((favoriteOffer) => {
          const newOfferIndex = newOffers.findIndex((offer) => favoriteOffer.id === offer.id);
          newOffers[newOfferIndex].isFavorite = true;
        });

        state.offers = newOffers;
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
      })
      .addCase(fetchNearestOfferAction.fulfilled, (state, action) => {
        state.nearestOffers = action.payload;
      })
      .addCase(updateOfferFavoriteStatusAction.fulfilled, (state, action) => {
        const newOffers = [...state.offers];
        const newOfferIndex = newOffers.findIndex((element) => element.id === action.payload);
        newOffers[newOfferIndex].isFavorite = !newOffers[newOfferIndex].isFavorite;
        state.favoriteOffers = newOffers.filter((offer) => offer.isFavorite === true);
        state.offers = newOffers;
      });
  }
});

export const { changeSort, resetSort, resetFavorites, changeActiveOfferId } = offerData.actions;
