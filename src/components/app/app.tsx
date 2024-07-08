import { MainScreen } from '../../pages/main-screen/main-screen';

type AppScreenProps = {
  cardsCount: number;
}

export const App = ({cardsCount}: AppScreenProps): JSX.Element => (
  <MainScreen cardsCount={cardsCount} />
);

