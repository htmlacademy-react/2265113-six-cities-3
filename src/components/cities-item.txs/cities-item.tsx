import { Link, useNavigate } from 'react-router-dom';
import { City } from '../../types/offers.ts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/city-process/city-process.ts';
import { resetSort } from '../../store/offer-data/offer-data.ts';
import { AppRoute } from '../../const.ts';
import { selectCurrentCity } from '../../store/city-process/selectors.ts';

type CitiesItemProps = {
  city: City;
}

export const CitiesItem = ({city}: CitiesItemProps): JSX.Element => {
  const currentCity = useAppSelector(selectCurrentCity);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onCityClick = () => {
    dispatch(changeCity(city));
    dispatch(resetSort());
    navigate(AppRoute.Main);
  };

  return (
    <li className="locations__item" key={city.name} onClick={onCityClick}>
      <Link className={`locations__item-link tabs__item ${currentCity.name === city.name ? 'tabs__item--active' : ''}`} to="/">
        <span>{city.name}</span>
      </Link>
    </li>
  );
};
