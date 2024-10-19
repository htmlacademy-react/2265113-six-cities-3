import { render, screen } from '@testing-library/react';
import { OfferScreen } from './offer-screen';
import { withHistory, withStore } from '../../tests/mock-component';
import { makeFakeStore } from '../../tests/mocks';

describe('Component: OfferScreen', () => {
  it('should render correctly', () => {
    const expectedTestId = 'offerScreen';
    const { withStoreComponent } = withStore(<OfferScreen />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
