import { render, screen } from '@testing-library/react';
import { OfferScreen } from './offer-screen';
import { withHistory, withStore } from '../../tests/mock-component';
import { makeFakeStore } from '../../tests/mocks';

vi.mock('../../components/favorites-button/favorites-button');

describe('Component: OfferScreen', () => {
  it('should render correctly', () => {
    const expectedTestId = 'offerScreen';
    const fakeStore = makeFakeStore();
    const { withStoreComponent } = withStore(<OfferScreen />, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
