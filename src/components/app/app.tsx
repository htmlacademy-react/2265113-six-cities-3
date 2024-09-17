import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthorizationStatus } from '../../const';
import { PrivateRoute } from './private-route/private-route';
import { RouteConfig } from '../../types/route-config';
import { createRoutesConfig } from './routes-config/routes-config';
import { selectOffers } from '../../store/selectors';
import { useAppSelector } from '../../hooks';
import { Loader } from '../loader/loader';

export const App = (): JSX.Element => {
  const offers = useAppSelector(selectOffers);
  const routes = createRoutesConfig(offers);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  if (isOffersDataLoading) {
    return (
      <Loader />
    );
  }

  const renderRoute = ({ path, element, private: isPrivate }: RouteConfig) => (
    <Route
      key={path}
      path={path}
      element={
        isPrivate ? (
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
            {element}
          </PrivateRoute>
        ) : (
          element
        )
      }
    />
  );

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {routes.map(renderRoute)}
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};
