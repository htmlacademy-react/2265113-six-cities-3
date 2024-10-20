import { render, screen } from '@testing-library/react';
import { CommentList } from './comment-list';
import { withHistory, withStore } from '../../tests/mock-component';
import { makeFakeStore } from '../../tests/mocks';

describe('Component: CommentList', () => {
  it('should render correctly', () => {
    const expectedTestId = 'commentList';
    const { withStoreComponent } = withStore(<CommentList />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
