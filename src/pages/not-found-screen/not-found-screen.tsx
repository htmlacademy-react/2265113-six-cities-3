import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Logo } from '../../components/logo/logo';

const styles = {
  container: {
    width: '80vw',
    margin: '40px auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  links: {
    marginTop: '30px'
  },
  link: {
    margin: '10px',
    color: 'blue',
    textDecoration: 'underline'
  }
} as const;

export const NotFoundScreen = (): JSX.Element => (
  <div>
    <Helmet>
      <title>Шесть городов. Страница не найдена</title>
    </Helmet>
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
        </div>
      </div>
    </header>

    <div style={styles.container}>
      <h1 className="text-4xl font-semibold">404 - Page Not Found</h1>
      <div style={styles.links}>
        <Link style={styles.link} to="/">Вернуться на главную</Link>
      </div>
    </div>
  </div>
);
