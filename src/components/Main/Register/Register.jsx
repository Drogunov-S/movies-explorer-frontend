import './Register.css';
import logo from "../../../images/logos/logo.svg";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import Main from "../Main";
import Form from "../Form/Form";
import {useValidate} from "../../../hooks/useValidate";

function Register({title, onRegistration, error}) {

    const [formValue, setFormValue] = useState(
        {name: '', email: '', password: ''}
    );
    const {
        handleValidation,
        errors,
        isFormValid
    } = useValidate('register', [{name: 'name'}, {name: 'email'}, {name: 'password'}]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        handleValidation(e);
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

        onRegistration(formValue);


    }


    return (
        <Main>
            <section className="container" aria-label={'Регистрация'}>
                <div className="login">
                    <Link to={'/'} className={"bnt login__logo"}>
                        <img className="login__logo-img"
                             alt={"Логотип"}
                             src={logo}
                        />
                    </Link>
                    <h1 className="login__title">{title}</h1>
                    <Form
                        className={'register'}
                        isValidForm={isFormValid}
                        onSubmit={handleSubmit}
                        error={error}
                        bntSaveName={'Зарегистрироваться'}
                    >
                        <label className={"login__label"} htmlFor={"name"}>Имя</label>
                        <input
                            className="login__input login__input_theme_dark"
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
                        <span className={'login__error'}>{errors.name}</span>
                        <label className={"login__label"} htmlFor={"email"}>E-mail</label>
                        <input
                            className="login__input login__input_theme_dark"
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
                        <span className={'login__error'}>{errors.email}</span>
                        <label className={"login__label"} htmlFor={"password"}>Пароль</label>
                        <input
                            className="login__input login__input_theme_dark"
                            id="password"
                            name="password"
                            type="password"
                            aria-label="Пароль"
                            placeholder="Пароль"
                            minLength="8"
                            maxLength="200"
                            required
                            value={formValue.password}
                            onChange={handleChange}
                        />
                        <span className={'login__error'}>{errors.password}</span>
                    </Form>
                    <div className="login__wrapper">
                        <p className={`login__subtext`}>Уже зарегистрированы?</p>
                        <Link to="/sign-in" className="bnt login__link">Войти</Link>
                    </div>
                </div>
            </section>
        </Main>
    );
}

export default Register;
