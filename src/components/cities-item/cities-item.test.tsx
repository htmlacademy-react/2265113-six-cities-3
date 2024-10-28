import { render, screen } from '@testing-library/react';
import { CitiesItem } from './cities-item';
import { withHistory, withStore } from '../../tests/mock-component';
import { makeFakeStore } from '../../tests/mocks';
import { Cities } from '../../const';

describe('Component: CitiesItem', () => {
  it('should render correctly', () => {
    const expectedTestId = 'citiesItem';
    const { withStoreComponent } = withStore(<CitiesItem city={Cities.PARIS} />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
