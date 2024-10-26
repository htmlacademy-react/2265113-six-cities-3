import { changeActiveOfferId, changeSort, offerData, resetSort } from './offer-data';
import { Sorts } from '../../const';
import { makeFakeCurrentOffer, makeFakeOffer, makeFakeOffers } from '../../tests/mocks';
import { fetchCurrentOfferAction, fetchFavoriteOffersAction, fetchNearestOfferAction, fetchOffersAction, updateOfferFavoriteStatusAction } from '../api-actions';

describe('OfferData Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const initialState = {
      offers: [],
      favoriteOffers: [],
      currentOffer: null,
      nearestOffers: [],
      isOffersDataLoading: false,
      sortOffers: Sorts.POPULAR,
      activeOfferId: null
    };

    const result = offerData.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const initialState = {
      offers: [],
      favoriteOffers: [],
      currentOffer: null,
      nearestOffers: [],
      isOffersDataLoading: false,
      sortOffers: Sorts.POPULAR,
      activeOfferId: null
    };

    const result = offerData.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should change sort with "changeSort" action', () => {
    const initialState = {
      offers: [],
      favoriteOffers: [],
      currentOffer: null,
      nearestOffers: [],
      isOffersDataLoading: false,
      sortOffers: Sorts.POPULAR,
      activeOfferId: null
    };
    const expectedSorts = Sorts.TOP_RATED_FIRST;

    const result = offerData.reducer(initialState, changeSort(expectedSorts));

    expect(result.sortOffers).toEqual(expectedSorts);
  });

  it('should reset sort with "resetSort" action', () => {
    const initialState = {
      offers: [],
      favoriteOffers: [],
      currentOffer: null,
      nearestOffers: [],
      isOffersDataLoading: false,
      sortOffers: Sorts.TOP_RATED_FIRST,
      activeOfferId: null
    };
    const expectedSorts = Sorts.POPULAR;

    const result = offerData.reducer(initialState, resetSort);

    expect(result.sortOffers).toEqual(expectedSorts);
  });

  it('should change activeOfferId with "changeActiveOfferId" action', () => {
    const initialState = {
      offers: [],
      favoriteOffers: [],
      currentOffer: null,
      nearestOffers: [],
      isOffersDataLoading: false,
      sortOffers: Sorts.POPULAR,
      activeOfferId: null
    };
    const expectedActiveOfferId = '123';

    const result = offerData.reducer(initialState, changeActiveOfferId(expectedActiveOfferId));

    expect(result.activeOfferId).toBe(expectedActiveOfferId);
  });

  it('should set "isOffersDataLoading" to "true" with "fetchOffersAction.pending"', () => {
    const initialState = {
      offers: [],
      favoriteOffers: [],
      currentOffer: null,
      nearestOffers: [],
      isOffersDataLoading: false,
      sortOffers: Sorts.TOP_RATED_FIRST,
      activeOfferId: null
    };
    const expectedIsOffersDataLoading = true;

    const result = offerData.reducer(initialState, fetchOffersAction.pending);

    expect(result.isOffersDataLoading).toBe(expectedIsOffersDataLoading);
  });

  it('should set "offers" to array with offers, "isOffersDataLoading" to "false" with "fetchOffersAction.fulfilled"', () => {
    const mockOffers = makeFakeOffers();
    const initialState = {
      offers: [],
      favoriteOffers: [],
      currentOffer: null,
      nearestOffers: [],
      isOffersDataLoading: true,
      sortOffers: Sorts.TOP_RATED_FIRST,
      activeOfferId: null
    };
    const expectedIsOffersDataLoading = false;

    const result = offerData.reducer(initialState, fetchOffersAction.fulfilled(mockOffers, '', undefined));

    expect(result.offers).toEqual(mockOffers);
    expect(result.isOffersDataLoading).toBe(expectedIsOffersDataLoading);
  });

  it('should set "isOffersDataLoading" to "false" with "fetchOffersAction.rejected"', () => {
    const initialState = {
      offers: [],
      favoriteOffers: [],
      currentOffer: null,
      nearestOffers: [],
      isOffersDataLoading: true,
      sortOffers: Sorts.TOP_RATED_FIRST,
      activeOfferId: null
    };
    const expectedIsOffersDataLoading = false;

    const result = offerData.reducer(initialState, fetchOffersAction.rejected);

    expect(result.isOffersDataLoading).toBe(expectedIsOffersDataLoading);
  });

  it('should set "isOffersDataLoading" to "true" with "fetchCurrentOfferAction.pending"', () => {
    const initialState = {
      offers: [],
      favoriteOffers: [],
      currentOffer: null,
      nearestOffers: [],
      isOffersDataLoading: false,
      sortOffers: Sorts.TOP_RATED_FIRST,
      activeOfferId: null
    };
    const expectedIsOffersDataLoading = true;

    const result = offerData.reducer(initialState, fetchCurrentOfferAction.pending);

    expect(result.isOffersDataLoading).toEqual(expectedIsOffersDataLoading);
  });

  it('should set "currentOffer" to array with currentOffer, "isOffersDataLoading" to "false" with "fetchCurrentOfferAction.fulfilled"', () => {
    const mockCurrentOffer = makeFakeCurrentOffer();
    const initialState = {
      offers: [],
      favoriteOffers: [],
      currentOffer: null,
      nearestOffers: [],
      isOffersDataLoading: true,
      sortOffers: Sorts.TOP_RATED_FIRST,
      activeOfferId: null
    };
    const expectedIsOffersDataLoading = false;
    const result = offerData.reducer(initialState, fetchCurrentOfferAction.fulfilled(mockCurrentOffer, '', mockCurrentOffer));

    expect(result.currentOffer).toEqual(mockCurrentOffer);
    expect(result.isOffersDataLoading).toBe(expectedIsOffersDataLoading);
  });

  it('should set "isOffersDataLoading" to "true" with "fetchFavoriteOffersAction.pending"', () => {
    const initialState = {
      offers: [],
      favoriteOffers: [],
      currentOffer: null,
      nearestOffers: [],
      isOffersDataLoading: false,
      sortOffers: Sorts.TOP_RATED_FIRST,
      activeOfferId: null
    };
    const expectedIsOffersDataLoading = true;
    const result = offerData.reducer(initialState, fetchFavoriteOffersAction.pending);

    expect(result.isOffersDataLoading).toBe(expectedIsOffersDataLoading);
  });

  it('should set "favoriteOffers" to array with favoriteOffers, "isOffersDataLoading" to "false" with "fetchFavoriteOffersAction.fulfilled"', () => {
    const mockOffers = makeFakeOffers();
    const initialState = {
      offers: [],
      favoriteOffers: [],
      currentOffer: null,
      nearestOffers: [],
      isOffersDataLoading: true,
      sortOffers: Sorts.TOP_RATED_FIRST,
      activeOfferId: null
    };
    const expectedIsOffersDataLoading = false;

    const result = offerData.reducer(initialState, fetchFavoriteOffersAction.fulfilled(mockOffers, '', undefined));

    expect(result.favoriteOffers).toEqual(mockOffers);
    expect(result.isOffersDataLoading).toBe(expectedIsOffersDataLoading);
  });

  it('should set "nearestOffers" to array with nearestOffers with "fetchNearestOfferAction.fulfilled"', () => {
    const mockOffers = makeFakeOffers();
    const initialState = {
      offers: [],
      favoriteOffers: [],
      currentOffer: null,
      nearestOffers: [],
      isOffersDataLoading: true,
      sortOffers: Sorts.TOP_RATED_FIRST,
      activeOfferId: null
    };

    const result = offerData.reducer(initialState, fetchNearestOfferAction.fulfilled(mockOffers, '', mockOffers[0]));

    expect(result.nearestOffers).toEqual(mockOffers);
  });

  it('should set "offers" to array with offers with "updateOfferFavoriteStatusAction.fulfilled"', () => {
    const mockOffer = makeFakeOffer();
    const mockFavoriteStatus = true;

    mockOffer.isFavorite = mockFavoriteStatus;

    const initialState = {
      offers: [mockOffer],
      favoriteOffers: [],
      currentOffer: null,
      nearestOffers: [],
      isOffersDataLoading: false,
      sortOffers: Sorts.POPULAR,
      activeOfferId: null
    };

    const result = offerData.reducer(initialState, updateOfferFavoriteStatusAction.fulfilled(
      [mockOffer],
      '',
      {
        id: mockOffer.id,
        favoriteStatus: mockFavoriteStatus
      }
    ));

    expect(result.favoriteOffers).toEqual([mockOffer]);
  });
});
