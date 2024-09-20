import {Route, Routes} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PrivateRoute } from './private-route/private-route';
import { RouteConfig } from '../../types/route-config';
import { createRoutesConfig } from './routes-config/routes-config';
import { selectOffers } from '../../store/selectors';
import { useAppSelector } from '../../hooks';
import { Loader } from '../loader/loader';
import { HistoryRouter } from '../history-route/history-route';
import { browserHistory } from '../../browser-history';

export const App = (): JSX.Element => {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
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
          <PrivateRoute authorizationStatus={authorizationStatus}>
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
      <HistoryRouter history={browserHistory}>
        <Routes>
          {routes.map(renderRoute)}
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
};
