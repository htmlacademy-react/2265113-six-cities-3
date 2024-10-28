import { render, screen } from '@testing-library/react';
import { FavoritesButton } from './favorites-button';
import { withHistory, withStore } from '../../tests/mock-component';
import { makeFakeStore } from '../../tests/mocks';

describe('Component: FavoritesButton', () => {
  const fakeStore = makeFakeStore();
  const expectedTestId = 'favoriteButton';

  it('should render correctly when this button from Favorites and Main pages', () => {
    const { withStoreComponent } = withStore(<FavoritesButton buttonType={0} offer={fakeStore.OFFERS.offers[0]} />, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('place-card__bookmark-button');
  });

  it('should render correctly when this button from Offer page', () => {
    const { withStoreComponent } = withStore(<FavoritesButton buttonType={1} offer={fakeStore.OFFERS.offers[0]} />, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('offer__bookmark-button');
  });
});
