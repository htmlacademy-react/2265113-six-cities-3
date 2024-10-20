import { render, screen } from '@testing-library/react';
import { Map } from './map';
import { Cities } from '../../const';
import { makeFakeOffers, makeFakeStore } from '../../tests/mocks';
import { withHistory, withStore } from '../../tests/mock-component';

describe('Component: Map', () => {
  it('should render correctly', () => {
    const expectedTestId = 'map';
    const mockOffers = makeFakeOffers();
    const { withStoreComponent } = withStore(<Map city={Cities.PARIS} points={mockOffers} />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
