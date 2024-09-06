import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/header/header';
import { Offer, City } from '../../types/offers';
import { OfferList } from '../../components/offer-list/offer-list';
import { Map } from '../../components/map/map';
import { CitiesList } from '../../components/cities-list/cities-list';
import { changeCity } from '../../store/action';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCurrentCity } from '../../store/selectors';

type MainScreenProps = {
  offers: Offer[];
}

export const MainScreen = ({offers}: MainScreenProps): JSX.Element => {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const currentCity = useAppSelector(selectCurrentCity);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const offersByCity = offers.filter((offer) => offer.city.name === currentCity.name);

  const citiesListClickHandler = (city: City) => {
    dispatch(changeCity(city));
    navigate(AppRoute.Main);
  };

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
            <CitiesList onCityClick={citiesListClickHandler} currentCity={currentCity} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersByCity.length} places to stay in {currentCity.name}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <OfferList offers={offersByCity} activeOfferId={activeOfferId} setActiveOfferId={setActiveOfferId} isNear={false} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  city={currentCity}
                  points={offersByCity}
                  selectedOffer={offers.find((offer) => offer.id === activeOfferId)}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

