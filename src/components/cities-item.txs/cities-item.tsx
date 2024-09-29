import { Link } from 'react-router-dom';
import { City } from '../../types/offers.ts';

type CitiesItemProps = {
  onCityClick: (city: City) => void;
  currentCity: City;
  city: City;
}

export const CitiesItem = ({onCityClick, currentCity, city}: CitiesItemProps): JSX.Element => (
  <li className="locations__item" key={city.name} onClick={() => onCityClick(city)}>
    <Link className={`locations__item-link tabs__item ${currentCity.name === city.name ? 'tabs__item--active' : ''}`} to="/">
      <span>{city.name}</span>
    </Link>
  </li>
);
