import { render, screen } from '@testing-library/react';
import { FavoritesList } from './favorites-list';
import { withHistory, withStore } from '../../tests/mock-component';
import { makeFakeOffers, makeFakeStore } from '../../tests/mocks';
import { Cities } from '../../const';

describe('Component: Card', () => {
  it('should render correctly', () => {
    const fakeOffers = makeFakeOffers();
    const expectedTestId = 'favoritesList';
    const { withStoreComponent } = withStore(<FavoritesList city={Cities.PARIS.name} offers={fakeOffers} />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
