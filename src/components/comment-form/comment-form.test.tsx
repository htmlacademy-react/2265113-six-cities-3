import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../tests/mock-component';
import { CommentForm } from './comment-form';
import { makeFakeStore } from '../../tests/mocks';

describe('Component: CommentForm', () => {
  const { withStoreComponent } = withStore(<CommentForm />, makeFakeStore());
  const preparedComponent = withHistory(withStoreComponent);

  it('should render correctly', () => {
    const headerText = 'Your review';
    const buttonText = 'Submit';

    render(preparedComponent);

    expect(screen.getByText(headerText)).toBeInTheDocument();
    expect(screen.getByText(buttonText)).toBeInTheDocument();
  });

  it('should render correctly when user enter rating and comment', async () => {
    const ratingElementTestId = 'formRating-3';
    const commentElementTestId = 'formComment';
    const expectedRatingValue = '3';
    const expectedCommentValue = 'test1';

    render(preparedComponent);

    await userEvent.type(
      screen.getByTestId(ratingElementTestId),
      expectedRatingValue,
    );
    await userEvent.type(
      screen.getByTestId(commentElementTestId),
      expectedCommentValue,
    );

    expect(screen.getByDisplayValue(expectedRatingValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedCommentValue)).toBeInTheDocument();
  });
});
