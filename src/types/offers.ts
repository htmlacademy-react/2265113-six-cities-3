export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: string;
  location: Location;
};

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
};

export const UrlMarkers = {
  DEFAULT: 'img/pin.svg',
  CURRENT: 'img/pin-active.svg'
};

export type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type CurrentOffer = Offer & {
  images: string[];
  description: string;
  goods: string[];
  host: Host;
  bedrooms: number;
  maxAdults: number;
};
