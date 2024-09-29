import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Header } from '../../components/header/header';
import { Offer, OnOfferClickHandlerProps } from '../../types/offers';
import { GroupedOffers } from '../../components/grouped-offers/grouped-offers';
import { useAppSelector } from '../../hooks';
import { selectFavoriteOffers } from '../../store/offer-data/selectors';

type FavoritesScreenProps = {
  onOfferClickHandler: OnOfferClickHandlerProps;
}

export const FavoritesScreen = ({onOfferClickHandler}: FavoritesScreenProps): JSX.Element => {
  const offers = useAppSelector(selectFavoriteOffers);
  const groupedOffers = offers.reduce((acc, offer) => {
    const cityName = offer.city.name;
    (acc[cityName] ||= []).push(offer);
    return acc;
  }, {} as Record<string, Offer[]>);

  return (
    <div className="page">
      <Helmet>
        <title>Шесть городов. Избранное</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <GroupedOffers groupedOffers={groupedOffers} onOfferClickHandler={onOfferClickHandler} />
          </section>
        </div>
      </main>

      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
};
