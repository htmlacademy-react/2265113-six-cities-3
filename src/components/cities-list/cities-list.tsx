import { Cities } from '../../const';
import { City } from '../../types/offers';
import { CitiesItem } from '../cities-item.txs/cities-item';

type CitiesListProps = {
  onCityClick: (city: City) => void;
  currentCity: City;
}

export const CitiesList = ({onCityClick, currentCity}: CitiesListProps): JSX.Element => (
  <ul className="locations__list tabs__list">
    {Object.values(Cities)
      .map((city) => (
        <CitiesItem onCityClick={onCityClick} currentCity={currentCity} city={city} key={city.name} />
      ))}
  </ul>
);
