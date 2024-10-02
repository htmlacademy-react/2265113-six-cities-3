import { Helmet } from 'react-helmet-async';
import { Header } from '../../components/header/header';
import { Sort } from '../../components/sort/sort';
import { OfferList } from '../../components/offer-list/offer-list';
import { OfferListEmpty } from '../../components/offer-list/offer-list-empty';
import { Map } from '../../components/map/map';
import { CitiesList } from '../../components/cities-list/cities-list';
import { CardType } from '../../const';
import { useAppSelector } from '../../hooks';
import { selectCurrentCity } from '../../store/city-process/selectors';
import { selectOffers } from '../../store/offer-data/selectors';

export const MainScreen = (): JSX.Element => {
  const currentCity = useAppSelector(selectCurrentCity);
  const offers = useAppSelector(selectOffers);

  const offersByCity = offers.filter((offer) => offer.city.name === currentCity.name);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Шесть городов. Главная</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        <div className="cities">
          {
            offersByCity.length === 0
              ? <OfferListEmpty currentCity={currentCity}/>
              : (
                <div className="cities__places-container container">
                  <section className="cities__places places">
                    <h2 className="visually-hidden">Places</h2>
                    <b className="places__found">{offersByCity.length} places to stay in {currentCity.name}</b>
                    <Sort />
                    <OfferList offers={offersByCity} cardType={CardType.MAIN} />
                  </section>
                  <div className="cities__right-section">
                    <section className="cities__map map">
                      <Map
                        city={currentCity}
                        points={offersByCity}
                      />
                    </section>
                  </div>
                </div>
              )
          }
        </div>
      </main>
    </div>
  );
};

