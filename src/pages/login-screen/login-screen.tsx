import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useRef, FormEvent } from 'react';
import { Logo } from '../../components/logo/logo';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { Cities } from '../../const';
import { changeCity } from '../../store/city-process/city-process';

export const LoginScreen = (): JSX.Element => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const randomCity = Object.values(Cities)[Math.floor(Math.random() * Object.entries(Cities).length)];

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction({
        email: emailRef.current.value,
        password: passwordRef.current?.value
      }));
    }
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <Helmet>
          <title>Шесть городов. Авторизация</title>
        </Helmet>
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" data-testid="loginElement" ref={emailRef} required />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" data-testid="passwordElement" ref={passwordRef} required />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="/"onClick={() => {
                dispatch(changeCity(randomCity));
              }}
              >
                <span>{randomCity.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
