import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../const';
import { MainScreen } from '../../pages/main-screen/main-screen';
import { LoginScreen } from '../../pages/login-screen/login-screen';
import { FavoritesScreen } from '../../pages/favorites-screen/favorites-screen';
import { OfferScreen } from '../../pages/offer-screen/offer-screen';
import { NotFoundScreen } from '../../pages/not-found-screen/not-found-screen';
import { PrivateRoute } from './private-route/private-route';
import { Offers } from '../../types/offers';

type AppScreenProps = {
  offers: Offers;
}

export const App = ({offers}: AppScreenProps): JSX.Element => {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={
              <MainScreen offers={offers}/>
            }
          />
          <Route
            path={AppRoute.Login}
            element={<LoginScreen />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              >
                <FavoritesScreen offers={favoriteOffers}/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={<OfferScreen offers={offers}/>}
          />
          <Route
            path="*"
            element={<NotFoundScreen />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};


