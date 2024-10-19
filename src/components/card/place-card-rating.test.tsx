import { render, screen } from '@testing-library/react';
import { PlaceCardRating } from './place-card-rating';
import { withHistory, withStore } from '../../tests/mock-component';
import { makeFakeOffer, makeFakeStore } from '../../tests/mocks';

describe('Component: PlaceCardRating', () => {
  it('should render correctly when Status "true"', () => {
    const fakeOffer = makeFakeOffer();
    const expectedTestId = 'cardRating';
    const expectedAnotherTestId = 'spanStatus';
    const { withStoreComponent } = withStore(<PlaceCardRating rating={fakeOffer.rating} status />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
    expect(screen.getByTestId(expectedAnotherTestId)).toBeInTheDocument();
  });

  it('should render correctly when Status "false"', () => {
    const fakeOffer = makeFakeOffer();
    const expectedTestId = 'cardRating';
    const expectedAnotherTestId = 'spanStatus';
    const { withStoreComponent } = withStore(<PlaceCardRating rating={fakeOffer.rating} status={false} />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
    expect(screen.queryByTestId(expectedAnotherTestId)).not.toBeInTheDocument();
  });
});
