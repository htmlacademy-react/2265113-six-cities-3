import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Offer, OfferClickHandlerProps } from '../../types/offers';
import { PlaceCardRating } from './place-card-rating';
import { useAppDispatch } from '../../hooks';
import { fetchCurrentOfferAction, fetchCommentsAction, fetchNearestOfferAction } from '../../store/api-actions';
import { BASE_OFFER_ROUTE, CardType, FavoritesType } from '../../const';
import { changeActiveOfferId } from '../../store/offer-data/offer-data';
import { PlaceCardImage } from './place-card-image';
import { FavoritesButton } from '../favorites-button/favorites-button';

const status = false;

type CardProps = {
  offer: Offer;
  cardType: number;
}

export const Card = ({offer, cardType}: CardProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleOfferClick = ({evt}: OfferClickHandlerProps) => {
    evt.stopPropagation();
    dispatch(fetchCurrentOfferAction(offer));
    dispatch(fetchCommentsAction(offer));
    dispatch(fetchNearestOfferAction(offer));
  };

  const cardClassMap = {
    [CardType.MAIN]: 'cities__card',
    [CardType.NEAR]: 'near-places__card',
    [CardType.FAVORITES]: 'favorites__card'
  };

  const imageWrapperClassMap = {
    [CardType.MAIN]: 'cities__image-wrapper',
    [CardType.NEAR]: 'near-places__image-wrapper',
    [CardType.FAVORITES]: 'favorites__image-wrapper'
  };

  return (
    <article className={cn('place-card', cardClassMap[cardType])}
      onMouseEnter={() => dispatch(changeActiveOfferId(offer.id))}
      onMouseLeave={() => dispatch(changeActiveOfferId(null))}
      data-testid='card'
    >
      { offer.isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> : '' }
      <div className={cn('place-card__image-wrapper', imageWrapperClassMap[cardType])} data-testid='cardImageWrapper' onClick={(evt) => handleOfferClick({evt})}>
        <Link to={`${BASE_OFFER_ROUTE}${offer.id}`}>
          <PlaceCardImage cardType={cardType} offer={offer} />
        </Link>
      </div>
      <div className={cn(
        'place-card__info',
        {'favorites__card-info': cardType === CardType.FAVORITES}
      )}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoritesButton buttonType={FavoritesType.CARD} offer={offer} />
        </div>
        <PlaceCardRating rating={offer.rating} status={status} />
        <h2 className="place-card__name">
          <Link to={`${BASE_OFFER_ROUTE}${offer.id}`} onClick={(evt) => handleOfferClick({evt})}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};
