import { useCallback } from 'react';
import {Route, Routes} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PrivateRoute } from './private-route/private-route';
import { RouteConfig } from '../../types/route-config';
import { createRoutesConfig } from './routes-config/routes-config';
import { selectOffers, selectIsOffersDataLoading } from '../../store/offer-data/selectors';
import { useAppSelector } from '../../hooks';
import { Loader } from '../loader/loader';
import { HistoryRouter } from '../history-route/history-route';
import { browserHistory } from '../../browser-history';
import { selectAuthorizationStatus } from '../../store/user-process/selectors';
import { useAppDispatch } from '../../hooks';
import { fetchCurrentOfferAction, fetchCommentsAction, fetchNearestOfferAction } from '../../store/api-actions';
import { OfferClickHandlerProps} from '../../types/offers';

export const App = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const offerClickHandler = useCallback(
    ({offer, evt}: OfferClickHandlerProps) => {
      evt.stopPropagation();
      dispatch(fetchCurrentOfferAction(offer));
      dispatch(fetchCommentsAction(offer));
      dispatch(fetchNearestOfferAction(offer));
    }, [dispatch]);

  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const offers = useAppSelector(selectOffers);
  const routes = createRoutesConfig(offers, offerClickHandler);
  const isOffersDataLoading = useAppSelector(selectIsOffersDataLoading);

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
