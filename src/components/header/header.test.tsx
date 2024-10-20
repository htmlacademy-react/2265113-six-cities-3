import { render, screen } from '@testing-library/react';
import { Header } from './header';
import { withHistory, withStore } from '../../tests/mock-component';
import { makeFakeStore } from '../../tests/mocks';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const expectedTestId = 'header';
    const { withStoreComponent } = withStore(<Header />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
