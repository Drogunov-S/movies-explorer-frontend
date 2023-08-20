import './Login.css';
import React, {useState} from 'react';
import logo from "../../images/logos/logo.svg";
import {Link} from "react-router-dom";

// import auth from "../utils/Auth";

function Login({title, buttonText, onLogin, onError}) {

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

        if (!(formValue.email || formValue.password)) {
            return;
        }
        // auth.authorize(formValue.email, formValue.password)
        //     .then(({token}) => {
        //       onLogin(token);
        //       setFormValue({email: '', password: ''});
        //     })
        //     .catch(err => {
        //       err.then(({message}) => {
        //         onError({message: message, isError: true});
        //       })
        //     })
    }


    return (
        <div className="container">
            <div className="data-form popup__item data-form_theme_dark">
                <a href={'/'} className={"logo login__logo"}>
                    <img className=""
                         alt={"Логотип"}
                         src={logo}
                    />
                </a>
                <h2 className="data-form__title data-form__title_theme_dark">{title}</h2>
                <form className="data-form__form"
                      onSubmit={handleSubmit}
                >
                    <label className={"data-form__label"} htmlFor={"email"}>E-mail</label>
                    <input
                        className="data-form__input data-form__input_type_text-fullname data-form__input_theme_dark"
                        id="email"
                        name="email"
                        type="email"
                        aria-label="Email"
                        // placeholder="Email"
                        minLength="2"
                        maxLength="40"
                        required
                        value={formValue.email}
                        onChange={handleChange}
                    />
                    <span className="data-form__input-error data-form__input-error_type_email"></span>
                    <label className={"data-form__label"} htmlFor={"password"}>Пароль</label>
                    <input
                        className="data-form__input data-form__input_type_text-position data-form__input_theme_dark"
                        id="password"
                        name="password"
                        type="password"
                        aria-label="Пароль"
                        // placeholder="Пароль"
                        minLength="2"
                        maxLength="200"
                        required
                        value={formValue.password}
                        onChange={handleChange}
                    />
                    <span className="data-form__input-error data-form__input-error_type_password"></span>
                    <button className="data-form__btn-save data-form__btn-save_theme_dark"
                            type="submit">{buttonText}
                    </button>
                </form>
                <div className="login__signup">
                    <p className={"login__signup-text"}>Ещё не зарегистрированы?</p>
                    <Link to="/sign-up" className="signup__link">Регистрация</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;
