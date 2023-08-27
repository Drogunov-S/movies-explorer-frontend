import './Register.css';
import logo from "../../../images/logos/logo.svg";
import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {mainApi} from "../../../utils/mainApi";
import Main from "../Main";

function Register({title, buttonText, classElement}) {

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
            <section className="container" aria-label={'Регистрация'}>
                <div className="data-form">
                    <Link to={'/'} className={"bnt data-form__logo"}>
                        <img className="data-form__logo-img"
                             alt={"Логотип"}
                             src={logo}
                        />
                    </Link>
                    <h1 className="data-form__title">{title}</h1>
                    <form className="data-form__form"
                          onSubmit={handleSubmit}
                    >
                        <label className={"data-form__label"} htmlFor={"name"}>Имя</label>
                        <input
                            className="data-form__input data-form__input_theme_dark"
                            id="name"
                            name="name"
                            type="text"
                            aria-label="name"
                            placeholder="Имя"
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
                            placeholder="Email"
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
                        {error.isError && <span className="data-form__input-error">{error.message}</span>}
                        <button className={`data-form__btn-save data-form__btn-save_type_${classElement}`}
                                type="submit">{buttonText}
                        </button>
                    </form>
                    <div className="data-form__wrapper">
                        <p className={`data-form__subtext`}>Уже зарегистрированы?</p>
                        <Link to="/sign-in" className="bnt data-form__link">Войти</Link>
                    </div>
                </div>
            </section>
        </Main>
    );
}

export default Register;
