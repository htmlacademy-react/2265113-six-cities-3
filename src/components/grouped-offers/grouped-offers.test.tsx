import { render, screen } from '@testing-library/react';
import { GroupedOffers } from './grouped-offers';
import { withHistory, withStore } from '../../tests/mock-component';
import { makeFakeOffers, makeFakeStore } from '../../tests/mocks';
import { Offer } from '../../types/offers';

describe('Component: GroupedOffers', () => {
  it('should render correctly', () => {
    const expectedTestId = 'groupedOffers';
    const fakeOffers = makeFakeOffers();

    const fakeGroupedOffers = fakeOffers.reduce((acc, offer) => {
      const cityName = offer.city.name;
      (acc[cityName] ||= []).push(offer);
      return acc;
    }, {} as Record<string, Offer[]>);

    const { withStoreComponent } = withStore(<GroupedOffers groupedOffers={fakeGroupedOffers} />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
