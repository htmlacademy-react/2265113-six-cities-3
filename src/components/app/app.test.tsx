import { render, screen} from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus, BASE_OFFER_ROUTE } from '../../const';
import { App } from './app';
import { withHistory, withStore } from '../../tests/mock-component';
import { makeFakeUser, makeFakeStore } from '../../tests/mocks';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainScreen" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByText(/places to stay/i)).toBeInTheDocument();
  });

  it('should render "LoginScreen" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByTestId('passwordElement')).toBeInTheDocument();
    expect(screen.getByTestId('loginElement')).toBeInTheDocument();
  });

  it('should render "FavoritesScreen" when user navigate to "/favorites"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      USER: { authorizationStatus: AuthorizationStatus.Auth, user: makeFakeUser() }
    }));
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });

  it('should render "OfferScreen" when user navigate to "/offer"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const fakeStore = makeFakeStore();
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);

    mockHistory.push(`${BASE_OFFER_ROUTE}${fakeStore.OFFERS.currentOffer?.id}`);

    render(withStoreComponent);

    expect(screen.getByTestId('offerScreen')).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });
});
