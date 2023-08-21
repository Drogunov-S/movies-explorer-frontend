import './Register.css';
import logo from "../../../images/logos/logo.svg";
import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {mainApi} from "../../../utils/mainApi";
import Main from "../Main";

function Register({title, buttonText}) {

    const [formValue, setFormValue] = useState(
        {name: '', email: '', password: ''}
    );

    const navigate = useNavigate();

    const [error, setError] = useState({message: '', isError: false});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!(formValue.email || formValue.password || formValue.name)) {
            return;
        }
        mainApi.register(formValue).then(
            data => {
                setFormValue({name: '', email: '', password: ''});
                // formValue.reset();
                navigate('/sign-in', {replace: true});
                console.log('Логин')
                console.log(data)
            })
            .catch(err => {
                err.then(({message}) => {
                    setError({message: message, isError: true});
                })
            })

    }


    return (
        <Main>
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
                        <label className={"data-form__label"} htmlFor={"name"}>Имя</label>
                        <input
                            className="data-form__input data-form__input_type_text-fullname data-form__input_theme_dark"
                            id="name"
                            name="name"
                            type="text"
                            aria-label="name"
                            // placeholder="Email"
                            minLength="2"
                            maxLength="40"
                            required
                            value={formValue.name}
                            onChange={handleChange}
                        />
                        <label className={"data-form__label"} htmlFor={"email"}>E-mail</label>
                        <input
                            className="data-form__input data-form__input_theme_dark"
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
                        {error.isError && <span className="data-form__input-error">{error.message}</span>}
                        <button className="data-form__btn-save data-form__btn-save_theme_dark"
                                type="submit">{buttonText}
                        </button>
                    </form>
                    <div className="login__signup">
                        <p className={"login__signup-text"}>Уже зарегистрированы?</p>
                        <Link to="/sign-in" className="signin__link">Войти</Link>
                    </div>
                </div>
            </div>
        </Main>
    );
}

export default Register;
