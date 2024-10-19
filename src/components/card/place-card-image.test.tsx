import { render, screen } from '@testing-library/react';
import { PlaceCardImage } from './place-card-image';
import { withHistory, withStore } from '../../tests/mock-component';
import { makeFakeOffer, makeFakeStore } from '../../tests/mocks';

describe('Component: PlaceCardImage', () => {
  it('should render correctly when cardType is Favorite', () => {
    const fakeOffer = makeFakeOffer();
    const expectedTestId = 'cardImg';
    const { withStoreComponent } = withStore(<PlaceCardImage offer={fakeOffer} cardType={1} />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });

  it('should render correctly when cardType is not Favorite', () => {
    const fakeOffer = makeFakeOffer();
    const expectedTestId = 'cardImgBig';
    const { withStoreComponent } = withStore(<PlaceCardImage offer={fakeOffer} cardType={0} />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
