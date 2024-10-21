import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { AppRoute, AuthorizationStatus, FavoritesType } from '../../const';
import { Offer } from '../../types/offers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectAuthorizationStatus } from '../../store/user-process/selectors';
import { fetchFavoriteOffersAction, fetchOffersAction, updateOfferFavoriteStatusAction } from '../../store/api-actions';

type FavoritesButtonProps = {
  offer: Offer;
  buttonType: number;
}

export const FavoritesButton = ({ buttonType, offer }: FavoritesButtonProps): JSX.Element => {
  const [favoriteStatus, setFavoriteStatus] = useState<boolean>(offer.isFavorite);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isCard = buttonType === FavoritesType.CARD;

  const handleFavoriteButtonClick = () => {
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

  const svgAttributes = {
    className: isCard ? 'place-card__bookmark-icon' : 'offer__bookmark-icon',
    width: isCard ? '18' : '31',
    height: isCard ? '19' : '33',
  };

  const favoritesClassMap = {
    [FavoritesType.CARD]: favoriteStatus ?
      'place-card__bookmark-button button place-card__bookmark-button--active'
      : 'place-card__bookmark-button button',
    [FavoritesType.OFFER_SCREEN]: favoriteStatus ?
      'offer__bookmark-button button offer__bookmark-button--active'
      : 'offer__bookmark-button button',
  };

  return (
    <button className={cn(favoritesClassMap[buttonType])} type="button" data-testid='favoriteButton' disabled={isUpdating}
      onClick={(evt) => {
        evt.stopPropagation();
        handleFavoriteButtonClick();
      }}
    >
      <svg {...svgAttributes}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{favoriteStatus ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
};
