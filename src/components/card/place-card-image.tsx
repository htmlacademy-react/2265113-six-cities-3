import { CardType } from '../../const';
import { Offer } from '../../types/offers';

type PlaceCardImageProps = {
  offer: Offer;
  cardType: number;
}

export const PlaceCardImage = ({ cardType, offer }: PlaceCardImageProps): JSX.Element => {
  const isFavorites = cardType === CardType.FAVORITES;

  const imageAttributes = {
    src: offer.previewImage,
    alt: 'Place image',
    width: isFavorites ? '150' : '260',
    height: isFavorites ? '110' : '200',
  };

  return (
    <img
      className="place-card__image"
      {...imageAttributes}
    />
  );
};
