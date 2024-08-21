import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Offer } from '../../types/offers';
import { PlaceCardRating } from './place-card-rating';

const status = false;

type CardProps = {
  offer: Offer;
  onSelect: (selectedId: string | null) => void;
  isActive: boolean;
}

export const Card = ({offer, onSelect, isActive}: CardProps): JSX.Element => {
  const [favorite, setFavorite] = useState(offer.isFavorite);

  return (
    <article className="cities__card place-card"
      onMouseEnter={() => onSelect(offer.id)}
      onMouseLeave={() => onSelect(null)}
      data-active={isActive ? 'true' : undefined}
    >
      { offer.isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> : '' }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={favorite ?
            'place-card__bookmark-button button place-card__bookmark-button--active button'
            : 'place-card__bookmark-button button'} type="button"
          onClick={() => {
            setFavorite(!favorite);
            offer.isFavorite = !offer.isFavorite;
          }}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{favorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <PlaceCardRating rating={offer.rating} status={status} />
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};
