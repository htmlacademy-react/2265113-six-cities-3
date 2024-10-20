import { render, screen } from '@testing-library/react';
import { Logo } from './logo';
import { withHistory, withStore } from '../../tests/mock-component';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    const expectedAltText = '6 cities logo';
    const { withStoreComponent } = withStore(<Logo />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
  });
});
