import { render, screen } from '@testing-library/react';
import { CitiesList } from './cities-list';
import { withHistory, withStore } from '../../tests/mock-component';
import { makeFakeStore } from '../../tests/mocks';

describe('Component: CitiesList', () => {
  it('should render correctly', () => {
    const expectedTestId = 'citiesList';
    const { withStoreComponent } = withStore(<CitiesList />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
