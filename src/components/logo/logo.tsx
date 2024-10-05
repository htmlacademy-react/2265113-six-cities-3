import {Link} from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { resetCurrentOffer } from '../../store/offer-data/offer-data';

export const Logo = (): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <Link className="header__logo-link header__logo-link--active" to={`${AppRoute.Main}`} onClick={() => dispatch(resetCurrentOffer())}>
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
    </Link>
  );
};
