import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../tests/mock-component';
import { NotFoundScreen } from './not-found-screen';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const expectedHeaderText = '404 - Page Not Found';
    const expectedLinkText = 'Вернуться на главную';
    const { withStoreComponent } = withStore(<NotFoundScreen />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
