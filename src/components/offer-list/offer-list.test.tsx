import { render, screen } from '@testing-library/react';
import { OfferList } from './offer-list';
import { withHistory, withStore } from '../../tests/mock-component';
import { makeFakeOffers, makeFakeStore } from '../../tests/mocks';

describe('Component: OfferList', () => {
  const fakeOffers = makeFakeOffers();
  const listClass = 'offerList';

  it('should render correctly for Main page offers', () => {
    const { withStoreComponent } = withStore(<OfferList offers={fakeOffers} cardType={0} />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(listClass)).toHaveClass('cities__places-list tabs__content');
  });

  it('should render correctly for Near offers', () => {
    const { withStoreComponent } = withStore(<OfferList offers={fakeOffers} cardType={2} />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(listClass)).toHaveClass('near-places__list');
  });
});
