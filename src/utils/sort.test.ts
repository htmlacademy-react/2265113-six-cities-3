import { sortOffersPriceHighToLow, sortOffersPriceLowToHigh, sortTopRatingFirst } from './sort';
import { makeFakeOffers } from './mocks';

describe('Function: sortOffersPriceLowToHigh', () => {
  it('should return "true" when offers are different', () => {
    const mockOffers = makeFakeOffers();
    const sortedMockOffers = mockOffers.sort(sortOffersPriceLowToHigh);
    const result = mockOffers.every((value, index) => value === sortedMockOffers[index]);

    expect(result).toBe(true);
  });
});

describe('Function: sortOffersPriceHighToLow', () => {
  it('should return "true" when offers are different', () => {
    const mockOffers = makeFakeOffers();
    const sortedMockOffers = mockOffers.sort(sortOffersPriceHighToLow);
    const result = mockOffers.every((value, index) => value === sortedMockOffers[index]);

    expect(result).toBe(true);
  });
});

describe('Function: sortTopRatingFirst', () => {
  it('should return "true" when offers are different', () => {
    const mockOffers = makeFakeOffers();
    const sortedMockOffers = mockOffers.sort(sortTopRatingFirst);
    const result = mockOffers.every((value, index) => value === sortedMockOffers[index]);

    expect(result).toBe(true);
  });
});
