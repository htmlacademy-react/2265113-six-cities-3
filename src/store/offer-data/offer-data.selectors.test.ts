import { NameSpace, Sorts } from '../../const';
import { makeFakeOffers } from '../../tests/mocks';
import { selectActiveOfferId, selectCurrentOffer, selectFavoriteOffers, selectIsOffersDataLoading, selectNearestOffers, selectOffers, selectSortOffers } from './selectors';

describe('OfferData selectors', () => {
  const state = {
    [NameSpace.Offers]: {
      offers: makeFakeOffers(),
      favoriteOffers: makeFakeOffers(),
      currentOffer: null,
      nearestOffers: makeFakeOffers(),
      isOffersDataLoading: false,
      sortOffers: Sorts.POPULAR,
      activeOfferId: null
    }
  };

  it('should return offers from state', () => {
    const { offers } = state[NameSpace.Offers];
    const result = selectOffers(state);

    expect(result).toBe(offers);
  });

  it('should return sortOffers from state', () => {
    const { sortOffers } = state[NameSpace.Offers];
    const result = selectSortOffers(state);

    expect(result).toBe(sortOffers);
  });

  it('should return currentOffer from state', () => {
    const { currentOffer } = state[NameSpace.Offers];
    const result = selectCurrentOffer(state);

    expect(result).toBe(currentOffer);
  });

  it('should return isOffersDataLoading from state', () => {
    const { isOffersDataLoading } = state[NameSpace.Offers];
    const result = selectIsOffersDataLoading(state);

    expect(result).toBe(isOffersDataLoading);
  });

  it('should return favoriteOffers from state', () => {
    const { favoriteOffers } = state[NameSpace.Offers];
    const result = selectFavoriteOffers(state);

    expect(result).toBe(favoriteOffers);
  });

  it('should return nearestOffers from state', () => {
    const { nearestOffers } = state[NameSpace.Offers];
    const result = selectNearestOffers(state);

    expect(result).toBe(nearestOffers);
  });

  it('should return nearestOffers from state', () => {
    const { activeOfferId } = state[NameSpace.Offers];
    const result = selectActiveOfferId(state);

    expect(result).toBe(activeOfferId);
  });
});
