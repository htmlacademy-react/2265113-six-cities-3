import {Route, Routes} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PrivateRoute } from './private-route/private-route';
import { RouteConfig } from '../../types/route-config';
import { createRoutesConfig } from './routes-config/routes-config';
import { selectIsOffersDataLoading } from '../../store/offer-data/selectors';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { Loader } from '../loader/loader';
import { selectAuthorizationStatus } from '../../store/user-process/selectors';
import { checkAuthAction, fetchFavoriteOffersAction, fetchOffersAction } from '../../store/api-actions';
import { useEffect } from 'react';
import { AuthorizationStatus } from '../../const';

export const App = (): JSX.Element => {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const routes = createRoutesConfig();
  const isOffersDataLoading = useAppSelector(selectIsOffersDataLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthAction());
    dispatch(fetchOffersAction());

    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteOffersAction());
    }
  }, [authorizationStatus, dispatch]);

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
      <Routes>
        {routes.map(renderRoute)}
      </Routes>
    </HelmetProvider>
  );
};
