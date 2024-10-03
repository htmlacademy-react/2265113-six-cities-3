import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { Offer, OfferClickHandlerProps } from '../../types/offers';
import { PlaceCardRating } from './place-card-rating';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateOfferFavoriteStatusAction, fetchFavoriteOffersAction, fetchOffersAction, fetchCurrentOfferAction, fetchCommentsAction, fetchNearestOfferAction } from '../../store/api-actions';
import { AuthorizationStatus, AppRoute, CardType } from '../../const';
import { selectAuthorizationStatus } from '../../store/user-process/selectors';
import { changeActiveOfferId } from '../../store/offer-data/offer-data';
import { PlaceCardImage } from './place-card-image';

const status = false;

type CardProps = {
  offer: Offer;
  cardType: number;
}

export const Card = ({offer, cardType}: CardProps): JSX.Element => {
  const [favoriteStatus, setFavoriteStatus] = useState<boolean>(offer.isFavorite);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const favoriteButtonClickHandler = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      setIsUpdating(true);
      dispatch(updateOfferFavoriteStatusAction({id: offer.id, favoriteStatus}));
      setFavoriteStatus(!favoriteStatus);
      dispatch(fetchFavoriteOffersAction);
      dispatch(fetchOffersAction);
    } else {
      navigate(AppRoute.Login);
    }
    setIsUpdating(false);
  };

  const onOfferClickHandler = ({evt}: OfferClickHandlerProps) => {
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
      onClick={(evt) => onOfferClickHandler({evt})}
    >
      { offer.isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> : '' }
      <div className={cn('place-card__image-wrapper', imageWrapperClassMap[cardType])}>
        <Link to={`/offer/${offer.id}`}>
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
          <button className={favoriteStatus ?
            'place-card__bookmark-button button place-card__bookmark-button--active button'
            : 'place-card__bookmark-button button'} type="button" disabled={isUpdating}
          onClick={(evt) => {
            evt.stopPropagation();
            favoriteButtonClickHandler();
          }}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{favoriteStatus ? 'In bookmarks' : 'To bookmarks'}</span>
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
