import { render, screen } from '@testing-library/react';
import { MainScreen } from './main-screen';
import { withHistory, withStore } from '../../tests/mock-component';
import { makeFakeStore } from '../../tests/mocks';

describe('Component: MainScreen', () => {
  it('should render correctly', () => {
    const expectedTestId = 'mainScreen';
    const { withStoreComponent } = withStore(<MainScreen />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
