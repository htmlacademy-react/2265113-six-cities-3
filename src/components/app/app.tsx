import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthorizationStatus } from '../../const';
import { PrivateRoute } from './private-route/private-route';
import { Offer } from '../../types/offers';
import { RouteConfig } from '../../types/route-config';
import { createRoutesConfig } from './routes-config/routes-config';

type AppScreenProps = {
  offers: Offer[];
}

export const App = ({offers}: AppScreenProps): JSX.Element => {
  const routes = createRoutesConfig(offers);

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
