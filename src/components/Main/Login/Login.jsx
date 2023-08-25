import './Login.css';
import React, {useState} from 'react';
import logo from "../../../images/logos/logo.svg";
import {Link} from "react-router-dom";
// import {mainApi} from "../../../utils/mainApi";
import Main from "../Main";

// import auth from "../utils/Auth";

function Login({title, buttonText, onLogin/*, onError*/}) {

    const [formValue, setFormValue] = useState(
        {email: '', password: ''}
    );

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //
        onLogin({token: 'token'});

        //

        ////TODO на время верстки
        /*if (!(formValue.email || formValue.password)) {
            return;
        }
        mainApi.authorize(formValue)
            .then(({token}) => {
              onLogin(token);
              setFormValue({email: '', password: ''});
            })
            .catch(err => {
              err.then(({message}) => {
                // onError({message: message, isError: true});
                  console.log(message);
              })
            })*/
    }


    return (
        <Main>
            <section className="container" aria-label={'Вход'}>
                <div className="data-form">
                    <Link to={'/'} className={"bnt data-form__logo"}>
                        <img className="data-form__logo-img"
                             alt={"Логотип"}
                             src={logo}
                        />
                    </Link>
                    <h2 className="data-form__title">{title}</h2>
                    <form className="data-form__form"
                          onSubmit={handleSubmit}
                    >
                        <label className={"data-form__label"} htmlFor={"email"}>E-mail</label>
                        <input
                            className="data-form__input data-form__input_theme_dark"
                            id="email"
                            name="email"
                            type="email"
                            aria-label="Email"
                            placeholder="E-mail"
                            minLength="2"
                            maxLength="40"
                            required
                            value={formValue.email}
                            onChange={handleChange}
                        />
                        <label className={"data-form__label"} htmlFor={"password"}>Пароль</label>
                        <input
                            className="data-form__input data-form__input_theme_dark"
                            id="password"
                            name="password"
                            type="password"
                            aria-label="Пароль"
                            placeholder="Пароль"
                            minLength="2"
                            maxLength="200"
                            required
                            value={formValue.password}
                            onChange={handleChange}
                        />
                        <span className="data-form__input-error"></span>
                        <button className="data-form__btn-save"
                                type="submit">{buttonText}
                        </button>
                    </form>
                    <div className="data-form__wrapper">
                        <p className={"data-form__subtext"}>Ещё не зарегистрированы?</p>
                        <Link to="/sign-up" className="bnt data-form__link">Регистрация</Link>
                    </div>
                </div>
            </section>
        </Main>
    )
}

export default Login;
