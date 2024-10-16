import { sortOffersBySort, sortOffersPriceHighToLow, sortOffersPriceLowToHigh, sortTopRatingFirst } from './sort';
import { makeFakeOffers } from '../tests/mocks';
import { Offer } from '../types/offers';

describe('sortFunctions: ', () => {
  let mockOffers: Offer[];

  beforeEach(() => {
    mockOffers = makeFakeOffers();
  });

  describe('Function: sortOffersPriceLowToHigh', () => {
    it('should return "true" when offers are sorted from low price to high', () => {
      const sortedMockOffers = mockOffers.sort(sortOffersPriceLowToHigh);
      const result = sortedMockOffers.every((offer, index) => {
        if (index === sortedMockOffers.length - 1) {
          return true;
        }
        return offer.price < sortedMockOffers[index + 1].price;
      });

      expect(result).toBe(true);
    });
  });

  describe('Function: sortOffersPriceHighToLow', () => {
    it('should return "true" when offers are sorted from high price to low', () => {
      const sortedMockOffers = mockOffers.sort(sortOffersPriceHighToLow);

      const result = sortedMockOffers.every((offer, index) => {
        if (index === sortedMockOffers.length - 1) {
          return true;
        }
        return offer.price > sortedMockOffers[index + 1].price;
      });

      expect(result).toBe(true);
    });
  });

  describe('Function: sortTopRatingFirst', () => {
    it('should return "true" when offers are sorted from high rating to low', () => {
      const sortedMockOffers = mockOffers.sort(sortTopRatingFirst);
      const result = sortedMockOffers.every((offer, index) => {
        if (index === sortedMockOffers.length - 1) {
          return true;
        }
        return offer.rating > sortedMockOffers[index + 1].rating;
      });

      expect(result).toBe(true);
    });
  });

  describe('Function: sortOffersBySort', () => {
    it('should return "true" when sorted from low to high offers are equal sortedMockOffers', () => {
      const sortFunction = (offerA: Offer, offerB: Offer) => offerA.price - offerB.price;
      const sortedMockOffers = mockOffers.sort(sortOffersPriceLowToHigh);

      expect(sortOffersBySort(sortFunction)(mockOffers)).toEqual(sortedMockOffers);
    });
  });
});
