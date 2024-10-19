import { render, screen } from '@testing-library/react';
import { FavoritesScreen } from './favorites-screen';
import { withHistory, withStore } from '../../tests/mock-component';
import { makeFakeStore } from '../../tests/mocks';

describe('Component: FavoritesScreen', () => {
  it('should render correctly', () => {
    const expectedTestId = 'favoritesScreen';
    const { withStoreComponent } = withStore(<FavoritesScreen />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
