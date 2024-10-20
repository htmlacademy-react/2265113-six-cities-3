import { render, screen } from '@testing-library/react';
import { CommentItem } from './comment-item';
import { withHistory, withStore } from '../../tests/mock-component';
import { makeFakeComments } from '../../tests/mocks';

describe('Component: CommentItem', () => {
  it('should render correctly', () => {
    const fakeComments = makeFakeComments();
    const expectedTestId = 'commentItem';
    const { withStoreComponent } = withStore(<CommentItem comment={fakeComments.comments[0]} />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
