type PlaceCardRatingProps = {
  rating: number;
  status: boolean;
}

export const PlaceCardRating = ({ rating, status }: PlaceCardRatingProps) => (
  <div className="place-card__rating rating" data-testid='cardRating'>
    <div className="place-card__stars rating__stars">
      <span style={{ width: `${rating * 20}%` }}></span>
      <span className="visually-hidden">{rating}</span>
    </div>
    { status ? <span className="offer__rating-value rating__value" data-testid='spanStatus'>{rating}</span> : '' }
  </div>
);
