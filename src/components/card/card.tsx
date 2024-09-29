import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { Offer, OnOfferClickHandlerProps } from '../../types/offers';
import { PlaceCardRating } from './place-card-rating';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateOfferFavoriteStatusAction, fetchFavoriteOffersAction, fetchOffersAction } from '../../store/api-actions';
import { AuthorizationStatus, AppRoute } from '../../const';
import { selectAuthorizationStatus } from '../../store/user-process/selectors';

const status = false;

type CardProps = {
  offer: Offer;
  onSelect: (selectedId: string | null) => void;
  isActive: boolean;
  onOfferClickHandler: OnOfferClickHandlerProps;
  isNear: boolean;
}

export const Card = ({offer, onSelect, isActive, onOfferClickHandler, isNear}: CardProps): JSX.Element => {
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
      navigate(AppRoute.Main);
    } else {
      navigate(AppRoute.Login);
    }
    setIsUpdating(false);
  };

  return (
    <article className={cn(
      'place-card',
      {'cities__card': !isNear},
      {'near-places__card': isNear}
    )}
    onMouseEnter={useCallback(() => onSelect(offer.id), [offer.id, onSelect])}
    onMouseLeave={useCallback(() => onSelect(null), [onSelect])}
    onClick={(evt) => onOfferClickHandler({offer, evt})}
    data-active={isActive ? 'true' : undefined}
    >
      { offer.isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> : '' }
      <div className={cn(
        'place-card__image-wrapper',
        {'cities__image-wrapper': !isNear},
        {'near-places__image-wrapper': isNear}
      )}
      >
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
