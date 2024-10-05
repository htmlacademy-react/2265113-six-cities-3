import { Cities } from '../../const';
import { CitiesItem } from '../cities-item.txs/cities-item';

export const CitiesList = (): JSX.Element => (
  <ul className="locations__list tabs__list">
    {Object.values(Cities)
      .map((city) => (
        <CitiesItem city={city} key={city.name} />
      ))}
  </ul>
);
