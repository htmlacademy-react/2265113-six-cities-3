import { render, screen } from '@testing-library/react';
import { FavoritesEmptyList } from './favorites-empty-list';
import { withHistory, withStore } from '../../tests/mock-component';

describe('Component: FavoritesEmptyList', () => {
  it('should render correctly', () => {
    const expectedTestId = 'favoritesEmptyList';
    const { withStoreComponent } = withStore(<FavoritesEmptyList />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
