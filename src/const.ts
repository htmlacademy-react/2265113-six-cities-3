export enum AppRoute {
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  Main = '/'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const COMMENTS_COUNT = 10;

export const UrlMarkers = {
  DEFAULT: '../public/img/pin.svg',
  CURRENT: '../public/img/pin-active.svg'
};
