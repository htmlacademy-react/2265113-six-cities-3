import {Offer} from '../types/offers';

export const offers: Offer[] = [
  {
    id: '19f1f1da-14e3-4ca6-a447-cb064feef81d',
    title: 'The house among olive ',
    type: 'room',
    price: 248,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/3.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37595,
        longitude: 4.891499,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 1.1
  },
  {
    id: '157cfe88-8fbd-4a15-a7bb-79ea54db9839',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'hotel',
    price: 222,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/7.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37595,
        longitude: 4.891499,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.3
  },
  {
    id: '3140cc6a-dcc1-44e9-bedb-76192fb6a6f5',
    title: 'House in countryside',
    type: 'apartment',
    price: 348,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/12.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37595,
        longitude: 4.891499,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 2.7
  },
  {
    id: '28435191-3bec-4b83-922c-941b7f2cb20e',
    title: 'Perfectly located Castro',
    type: 'room',
    price: 151,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/8.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37595,
        longitude: 4.891499,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 16
    },
    isFavorite: true,
    isPremium: true,
    rating: 4
  },
];
