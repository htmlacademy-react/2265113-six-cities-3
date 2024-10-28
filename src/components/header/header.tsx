import { Logo } from '../logo/logo';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import { selectUserData, selectAuthorizationStatus } from '../../store/user-process/selectors';
import { selectFavoriteOffers } from '../../store/offer-data/selectors';
import { logoutAction } from '../../store/api-actions';
import { resetFavorites } from '../../store/offer-data/offer-data';

export const Header = () => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const userData = useAppSelector(selectUserData);
  const favoriteOffers = useAppSelector(selectFavoriteOffers);

  return (
    <header className="header" data-testid='header'>
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {
                authorizationStatus === AuthorizationStatus.Auth
                  ? (
                    <>
                      <li className="header__nav-item user">
                        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                          <div className="header__avatar-wrapper user__avatar-wrapper">
                          </div>
                          <span className="header__user-name user__name">{userData?.email}</span>
                          <span className="header__favorite-count">{favoriteOffers.length}</span>
                        </Link>
                      </li>
                      <li className="header__nav-item">
                        <Link className="header__nav-link" to={AppRoute.Login} onClick={(evt) => {
                          evt.preventDefault();
                          dispatch(logoutAction());
                          dispatch(resetFavorites());
                        }}
                        >
                          <span className="header__signout">Sign out</span>
                        </Link>
                      </li>
                    </>
                  )
                  : (
                    <li className="header__nav-item">
                      <Link className="header__nav-link" to={AppRoute.Login}>
                        <span className="header__signout">Sign in</span>
                      </Link>
                    </li>
                  )
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
