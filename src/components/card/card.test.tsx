import { render, screen } from '@testing-library/react';
import { Card } from './card';
import { withHistory, withStore } from '../../tests/mock-component';
import { makeFakeOffer, makeFakeStore } from '../../tests/mocks';

describe('Component: Card', () => {
  const fakeOffer = makeFakeOffer();
  const cardClass = 'card';
  const imageWrapperClass = 'cardImageWrapper';

  it('should render correctly when cardType is "Main"', () => {
    const { withStoreComponent } = withStore(<Card offer={fakeOffer} cardType={0} />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(cardClass)).toHaveClass('cities__card');
    expect(screen.getByTestId(imageWrapperClass)).toHaveClass('cities__image-wrapper');
  });

  it('should render correctly when cardType is "Near"', () => {
    const { withStoreComponent } = withStore(<Card offer={fakeOffer} cardType={2} />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(cardClass)).toHaveClass('near-places__card');
    expect(screen.getByTestId(imageWrapperClass)).toHaveClass('near-places__image-wrapper');
  });

  it('should render correctly when cardType is "Favorites"', () => {
    const { withStoreComponent } = withStore(<Card offer={fakeOffer} cardType={1} />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(cardClass)).toHaveClass('favorites__card');
    expect(screen.getByTestId(imageWrapperClass)).toHaveClass('favorites__image-wrapper');
  });
});
