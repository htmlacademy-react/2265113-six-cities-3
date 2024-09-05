import { Link } from 'react-router-dom';
import { Cities } from '../../const';
import { City } from '../../types/offers';

type CitiesListProps = {
  onCityClick: (city: City) => void;
  currentCity: City;
}

export const CitiesList = ({onCityClick, currentCity}: CitiesListProps): JSX.Element => (
  <ul className="locations__list tabs__list">
    {Object.values(Cities)
      .map((city) => (
        <li className="locations__item" key={city.name} onClick={() => onCityClick(city)}>
          <Link className={`locations__item-link tabs__item ${currentCity.name === city.name ? 'tabs__item--active' : ''}`} to="/">
            <span>{city.name}</span>
          </Link>
        </li>
      ))}
  </ul>
);
