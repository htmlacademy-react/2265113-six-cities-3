import { RouteConfig } from '../../../types/route-config';
import { Offer } from '../../../types/offers';
import { AppRoute } from '../../../const';
import { MainScreen } from '../../../pages/main-screen/main-screen';
import { LoginScreen } from '../../../pages/login-screen/login-screen';
import { FavoritesScreen } from '../../../pages/favorites-screen/favorites-screen';
import { OfferScreen } from '../../../pages/offer-screen/offer-screen';
import { NotFoundScreen } from '../../../pages/not-found-screen/not-found-screen';

export const createRoutesConfig = (offers: Offer[], offerClickHandler: (Offer: Offer) => void): RouteConfig[] => [
  {
    path: AppRoute.Main,
    element: <MainScreen offers={offers} onOfferClickHandler={offerClickHandler} />
  },
  {
    path: AppRoute.Login,
    element: <LoginScreen />,
  },
  {
    path: AppRoute.Favorites,
    element: <FavoritesScreen onOfferClickHandler={offerClickHandler} />,
    private: true,
  },
  {
    path: AppRoute.Offer,
    element: <OfferScreen offers={offers} onOfferClickHandler={offerClickHandler} />,
  },
  {
    path: '*',
    element: <NotFoundScreen />,
  }
];
