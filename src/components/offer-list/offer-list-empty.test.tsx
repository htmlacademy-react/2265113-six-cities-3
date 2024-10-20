import { render, screen } from '@testing-library/react';
import { OfferListEmpty } from './offer-list-empty';
import { withHistory, withStore } from '../../tests/mock-component';
import { Cities } from '../../const';

describe('Component: OfferListEmpty', () => {
  it('should render correctly', () => {
    const expectedTestId = 'offerListEmpty';
    const { withStoreComponent } = withStore(<OfferListEmpty currentCity={Cities.PARIS} />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
